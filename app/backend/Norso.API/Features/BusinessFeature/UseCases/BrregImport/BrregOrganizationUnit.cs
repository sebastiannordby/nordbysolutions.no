namespace Norso.API.Features.BusinessFeature.UseCases.BrregImport
{
    public class BrregOrganizationUnitContract
    {
        public object[] links { get; set; }
        public string organisasjonsnummer { get; set; }
        public string navn { get; set; }
        public Organisasjonsform organisasjonsform { get; set; }
        public Historiskenavn[] historiskeNavn { get; set; }
        public Postadresse postadresse { get; set; }
        public string registreringsdatoEnhetsregisteret { get; set; }
        public bool registrertIMvaregisteret { get; set; }
        public Naeringskode1 naeringskode1 { get; set; }
        public Naeringskode2 naeringskode2 { get; set; }
        public Naeringskode3 naeringskode3 { get; set; }
        public int antallAnsatte { get; set; }
        public bool harRegistrertAntallAnsatte { get; set; }
        public string registreringsdatoMerverdiavgiftsregisteret { get; set; }
        public string registreringsdatoMerverdiavgiftsregisteretEnhetsregisteret { get; set; }
        public string registreringsdatoAntallAnsatteEnhetsregisteret { get; set; }
        public string registreringsdatoAntallAnsatteNAVAaregisteret { get; set; }
        public string epostadresse { get; set; }
        public string telefon { get; set; }
        public Forretningsadresse forretningsadresse { get; set; }
        public string stiftelsesdato { get; set; }
        public Institusjonellsektorkode institusjonellSektorkode { get; set; }
        public bool registrertIForetaksregisteret { get; set; }
        public bool registrertIStiftelsesregisteret { get; set; }
        public bool registrertIFrivillighetsregisteret { get; set; }
        public string sisteInnsendteAarsregnskap { get; set; }
        public bool konkurs { get; set; }
        public bool underAvvikling { get; set; }
        public bool underTvangsavviklingEllerTvangsopplosning { get; set; }
        public string maalform { get; set; }
        public string vedtektsdato { get; set; }
        public string[] vedtektsfestetFormaal { get; set; }
        public string[] aktivitet { get; set; }
        public string registreringsdatoForetaksregisteret { get; set; }
        public bool registrertIPartiregisteret { get; set; }
        public object[] paategninger { get; set; }
        public bool erIKonsern { get; set; }
        public Kapital kapital { get; set; }
        public string respons_klasse { get; set; }
    }

    public class Organisasjonsform
    {
        public object[] links { get; set; }
        public string kode { get; set; }
        public string beskrivelse { get; set; }
    }

    public class Postadresse
    {
        public string land { get; set; }
        public string landkode { get; set; }
        public string postnummer { get; set; }
        public string poststed { get; set; }
        public string[] adresse { get; set; }
        public string kommune { get; set; }
        public string kommunenummer { get; set; }
    }

    public class Naeringskode1
    {
        public string kode { get; set; }
        public string beskrivelse { get; set; }
    }

    public class Naeringskode2
    {
        public string kode { get; set; }
        public string beskrivelse { get; set; }
    }

    public class Naeringskode3
    {
        public string kode { get; set; }
        public string beskrivelse { get; set; }
    }

    public class Forretningsadresse
    {
        public string land { get; set; }
        public string landkode { get; set; }
        public string postnummer { get; set; }
        public string poststed { get; set; }
        public string[] adresse { get; set; }
        public string kommune { get; set; }
        public string kommunenummer { get; set; }
    }

    public class Institusjonellsektorkode
    {
        public string kode { get; set; }
        public string beskrivelse { get; set; }
    }

    public class Kapital
    {
        public float belop { get; set; }
        public int antallAksjer { get; set; }
        public string type { get; set; }
        public string valuta { get; set; }
        public string innfortDato { get; set; }
    }

    public class Historiskenavn
    {
        public string navn { get; set; }
        public string fraDato { get; set; }
        public string tilDato { get; set; }
    }

}
