using Microsoft.EntityFrameworkCore;
using Norso.API.Features;
using Norso.API.Features.BusinessFeature;
using Norso.API.Infrastructure;

var builder = WebApplication.CreateBuilder(args);
const string LocalFrontendCorsPolicy = "LocalFrontend";

builder.Logging.ClearProviders();
builder.Logging.AddConsole();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddCors(options =>
{
    options.AddPolicy(LocalFrontendCorsPolicy, policy =>
    {
        policy
            .WithOrigins("http://localhost:5173", "https://vrimle.app", "https://app.norso")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddBusinessFeature();

builder.Services.AddInfrastructure();

builder.Services.AddDbContext<VrimleContext>(options =>
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

app.UseCors(LocalFrontendCorsPolicy);

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
