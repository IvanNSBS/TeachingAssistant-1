import { assert } from 'console';
import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
import { Alert } from 'selenium-webdriver';

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sameID = ((elem, id) => elem.element(by.name('idList')).getText().then(text => text === id));
let sameTitulo = ((elem, titulo) => elem.element(by.name('tituloList')).getText().then(text => text === titulo));
let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

async function assertTamanhoEqual(set, n) {
    await set.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(n));
}

async function assertElementsWithSameTituloAndId(n, titulo, id) { 
    var allRoteiros : ElementArrayFinder = element.all(by.name('roteiroList'));
    var sameIdAndTitle = allRoteiros.filter(elem => pAND(sameID(elem,id),sameTitulo(elem,titulo)));
    await assertTamanhoEqual(sameIdAndTitle,n);
}

async function assertElementsWithSameId(n, id) {
    var allRoteiros : ElementArrayFinder = element.all(by.name('roteiroList'));
    var sameIds = allRoteiros.filter(elem => sameID(elem,id));
    await assertTamanhoEqual(sameIds,n); 
}

async function criarRoteiro(titulo, meta, id, questoes) {
    await $("input[name='titulobox']").sendKeys(<string> titulo);
    await $("input[name='metabox']").sendKeys(<string> meta);
    await $("input[name='idbox']").sendKeys(<string> id);
    
    if(questoes !== undefined){
        for(let question of questoes){
            await $("button[name='addQuestionBtn']").click();
            var allQuestions : ElementArrayFinder = element.all(by.name('questaobox'));
            await allQuestions.last().sendKeys(<string> question);
        }
    }

    await element(by.buttonText('Criar Roteiro')).click();
}

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^I am at the roteiros page$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='roteiros']").click();
    })

    Given(/^I cannot see a roteiro named "([^\"]*)" with Id equal to "([^\"]*)"$/, async(titulo, id) => {
        try{
            let ale:Alert = browser.switchTo().alert();
            await ale.accept();
        }
        catch(e){ 
        }
        await assertElementsWithSameTituloAndId(0, titulo, id);
    })

    Then(/^I go to Novo Roteiro page/, async() => {
        await $("a[name='creationBtn']").click();
    })

    When(/^I try to create the roteiro with titulo "([^\"]*)" id "([^\"]*)" meta "([^\"]*)" and the questions: "([^\"]*)" and "([^\"]*)"$/, 
        async(titulo, id, meta, question1, question2) => 
    {
        let questoes = [question1, question2];
        await criarRoteiro(titulo, meta, id, questoes);
    })
    
    Then(/^I can see the roteiro "([^\"]*)" with id "([^\"]*)" on the list at Roteiro page$/, async(titulo, id) => {
        await browser.get("http://localhost:4200/roteiros");
        await assertElementsWithSameTituloAndId(1, titulo, id);
    })





    Given(/^I can see a roteiro with id "([^\"]*)"$/, async(id) => {
        await $("a[name='creationBtn']").click();
        await criarRoteiro(id, id, id, undefined);
        await assertElementsWithSameTituloAndId(1, id, id);
    })

    When(/^I click on delete "([^\"]*)"/, async(id) => {
        var allRoteiros : ElementArrayFinder = element.all(by.name('roteiroList'));
        var sameId = allRoteiros.filter(elem => sameID(elem,id));
        await assertTamanhoEqual(sameId, 1);
        await sameId.all(by.name('deleteBtn')).first().click();
		let ale:Alert = browser.switchTo().alert();
		await ale.accept();
    })

    Then(/^I can no longer see roteiro "([^\"]*)" on the roteiro list$/, async(id) => {
        assertElementsWithSameId(0, id)
    })

    Then(/^I am still at the roteiro page$/, async() => {
        assert(browser.getCurrentUrl().then(text => expect(Promise.resolve(text)).to.eventually.equal("http://localhost:4200/roteiros")))
    })
    
    When(/^I click on the Lixeira Button$/, async() => {
        await $("a[name='lixeiraBtn']").click();
    })

    Then(/^I am Redirected to Lixeira Page$/, async() => {
        assert(browser.getCurrentUrl().then(text => expect(Promise.resolve(text)).to.eventually.equal("http://localhost:4200/roteiros/lixeira")))
    })

    Then(/^I select the roteiro with id "([^\"]*)"$/, async(id) => {
        var allRoteiros : ElementArrayFinder = element.all(by.name('delList'));
        var sameId = allRoteiros.filter(elem => sameID(elem, id));
        await assertTamanhoEqual(sameId, 1);
        await sameId.all(by.name('selectList')).first().click();
    })

    When(/^I click on the Delete Button$/, async() => {
        await $("button[name='permaDel']").click();
		let ale:Alert = browser.switchTo().alert();
		await ale.accept();
    })

    When(/^I click on the Restore Button$/, async() => {
        await $("button[name='restore']").click();
		let ale:Alert = browser.switchTo().alert();
		await ale.accept();
    })

    Then(/^I can no longer see the roteiro with id "([^\"]*)"$/, async(id) => {
        assertElementsWithSameId(0, id);
    })

	Then(/^I'm still at the Lixeira Page$/, async() => {
        assert(browser.getCurrentUrl().then(text => expect(Promise.resolve(text)).to.eventually.equal("http://localhost:4200/roteiros/lixeira")))
    })
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}