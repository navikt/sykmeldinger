import { Normaltekst } from 'nav-frontend-typografi';

function ForklaringZDiagnose(): JSX.Element {
    return (
        <>
            <Normaltekst>
                Legen har skrevet en diagnose i sykmeldingen som ikke gir deg rett til å få sykepenger. Hvis du mener
                det er feil, kan du kontakte legen din.
            </Normaltekst>
            <Normaltekst>
                Du kan også kontakte arbeidsgiveren din og høre om du kan bruke egenmelding eller velferdspermisjon i
                stedet.
            </Normaltekst>
        </>
    );
}

export default ForklaringZDiagnose;
