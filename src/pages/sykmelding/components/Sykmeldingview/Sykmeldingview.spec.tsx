import { mount } from '@cypress/react';
import Sykmeldingview from './Sykmeldingview';

it('renders learn react link', () => {
    mount(<h1>Hello world</h1>);
    cy.get('h1').contains('Hello ');
});
