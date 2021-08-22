import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
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
        questoes.forEach( q => {

        });
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
        console.log("Wanted title: " + titulo);
        console.log("Wanted id: " + id);
        await assertElementsWithSameTituloAndId(1, titulo, id);
    })
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }