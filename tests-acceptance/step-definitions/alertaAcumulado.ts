import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

var accumulated;

defineSupportCode(function ({ Given, When, Then }) {

    Given(/^The prize has accumulated for more than R\$ "([\d]*)"$/, async(prize) => {
        var estimatedPrize = element(by.name('prize'));
        await estimatedPrize;
        await expect(estimatedPrize).to.eventually.beGreaterThan(prize);
    });

    When(/^I see the estimated prize section$/, () => {
        accumulated = element(by.name('accumulated'));
    });

    Then(/^I see an "([^\"]*)" alert$/, alert => {
        expect(accumulated.getText()).to.eventually.equal(alert);
    });

});