import { BodyLong } from '@navikt/ds-react';

function ForklaringZDiagnose(): JSX.Element {
    return (
        <>
            <BodyLong>
                Legen har skrevet en diagnose i sykmeldingen som ikke gir deg rett til å få sykepenger. Hvis du mener
                det er feil, kan du kontakte legen din.
            </BodyLong>
            <BodyLong>
                Du kan også kontakte arbeidsgiveren din og høre om du kan bruke egenmelding eller velferdspermisjon i
                stedet.
            </BodyLong>
        </>
    );
}

export default ForklaringZDiagnose;
