import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
import { async } from 'q';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

var indexTime = -1;
var mandante = true;

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
    });

    When(/^I request the field "([^\"]*)" vs "([^\"]*)"$/, async(mandante, visitante) => {
        var allMandantes: ElementArrayFinder = element.all(by.className('mandante'));
        await allMandantes;

        await allMandantes.get(indexTime).click();
    });

    Then(/^I can see "([^\"]*)" attached to "([^\"]*)"$/, async(probabilidade, time) => {
        let winProbability;
        let probabilities: ElementArrayFinder;
        if(mandante === true) {
            probabilities = element.all(by.name('probabilidadeMandante'));
            mandante = false;
        }
        else 
            probabilities = element.all(by.name('probabilidadeVisitante'));

        await probabilities.get(indexTime).getText().then(text => winProbability = text.substr(3));
        await expect(Promise.resolve(winProbability)).to.eventually.equal(probabilidade);
    });

});