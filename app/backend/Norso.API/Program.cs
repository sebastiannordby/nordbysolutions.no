using Microsoft.EntityFrameworkCore;
using Norso.API.Features;
using Norso.API.Features.BusinessFeature;
using Norso.API.Infrastructure;

var builder = WebApplication.CreateBuilder(args);
const string VrimleAppCorsPolicyName = "LocalFrontend";

builder.Logging.ClearProviders();
builder.Logging.AddConsole();

builder.Configuration.AddKeyPerFile(
    "/run/secrets",
    optional: true,
    reloadOnChange: false);

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddCors(options =>
{
    options.AddPolicy(VrimleAppCorsPolicyName, policy =>
    {
        policy
            .WithOrigins("https://vrimle.app")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddBusinessFeature();

builder.Services.AddInfrastructure();

builder.Services.AddDbContext<VrimleContext>(options =>
{
    var connectionString = builder.Configuration["Secrets:PostgresDbConnectionString"];

    if (string.IsNullOrWhiteSpace(connectionString))
    {
        throw new InvalidOperationException("Database connection string is not configured.");
    }

    options.UseNpgsql(connectionString);
});

builder.Services.AddDbContext<MssqlVrimleContext>(options =>
{
    var connectionString = builder.Configuration["Secrets:DbConnectionString"];

    if (string.IsNullOrWhiteSpace(connectionString))
    {
        throw new InvalidOperationException("Database connection string is not configured.");
    }

    options.UseSqlServer(connectionString);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors(VrimleAppCorsPolicyName);

app.UseAuthorization();

app.MapControllers();

var apiRouteGroup = app.MapGroup("/api");

apiRouteGroup.MapBusinessFeatureEndpoints();

if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<VrimleContext>();
    dbContext.Database.EnsureCreated();
}

app.Run();
