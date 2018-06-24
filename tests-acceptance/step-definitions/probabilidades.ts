import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
import { async } from 'q';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

var indexTime = -1;
var mandante = false;

defineSupportCode(function ({ Given, When, Then }) {

    Given(/^"([^\"]*)" has "([^\"]*)" win probability calculated$/, async(time, probabilidade) => {
        var allMandantes: ElementArrayFinder = element.all(by.className('mandante'));
        await allMandantes;
        var allVisitantes: ElementArrayFinder = element.all(by.className('visitante'));
        await allVisitantes;
        await allMandantes.each((item, index) => item.getText().then(text => { 
            if(text === time) 
                indexTime = index;
            }));
        await allVisitantes.each((item, index) => item.getText().then(text => { 
            if(text === time) 
                indexTime = index; 
            }));

        let winProbability;
        let probabilities: ElementArrayFinder;
        if(mandante === true) 
            probabilities = element.all(by.className('probabilidadeMandante'));
        else 
            probabilities = element.all(by.className('probabilidadeVisitante'));

        await probabilities.get(indexTime).getText().then(text => winProbability = text);
        await expect(Promise.resolve(winProbability)).to.eventually.equal(probabilidade);
    });

    When(/^I request the field "([^\"]*)" vs "([^\"]*)"$/, async(mandante, visitante) => {
        var allMandantes: ElementArrayFinder = element.all(by.className('mandante'));
        await allMandantes;

        await allMandantes.get(indexTime).click();
    });

    Then(/^I can see "([^\"]*)" attached to "([^\"]*)"$/, async(probabilidade, time) => {
        let winProbability;
        let probabilities: ElementArrayFinder;
        if(mandante === true) 
            probabilities = element.all(by.className('probabilidadeMandante'));
        else 
            probabilities = element.all(by.className('probabilidadeVisitante'));
        await expect(probabilities.get(indexTime).getCssValue('display')).to.not.equal('none');
    });

});