import 'reflect-metadata';
import { mount } from '@cypress/react';
import Sykmeldingview from './Sykmeldingview';
import sykmeldingApen from '../../../../../cypress/fixtures/sykmeldinger/sykmelding-apen.json';
import { plainToClass } from 'class-transformer';
import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';

it('Renders sykmeldingview', () => {
    const sykmelding = plainToClass(Sykmelding, sykmeldingApen);

    mount(<Sykmeldingview sykmelding={sykmelding} />);
    cy.get('h1').contains('Hello ');
});
