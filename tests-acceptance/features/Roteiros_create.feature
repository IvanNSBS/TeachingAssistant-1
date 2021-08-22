Feature: As a professor
         I want to register roteiros
         So i can give exercises to students

Scenario: Creating new roteiro
Given I am at the roteiros page
Given I cannot see a roteiro named "Requisitos" with Id equal to "requisitos"
Then I go to Novo Roteiro page
When I try to create the roteiro with titulo "Requisitos" id "requisitos" meta "requisitos" and the questions: "Q1?" and "Q2?" 
Then I can see the roteiro "Requisitos" with id "requisitos" on the list at Roteiro page 

Scenario: Conflict on new roteiro creation
Given I am at the roteiros page
Given I cannot see a roteiro named "Conflito" with Id equal to "conflito"
Then I go to Novo Roteiro page
When I try to create the roteiro with titulo "Conflito" id "conflito" meta "Conflito" and the questions: "Q1?" and "Q2?" 
Then I can see the roteiro "Conflito" with id "conflito" on the list at Roteiro page
Then I go to Novo Roteiro page
When I try to create the roteiro with titulo "Conflito 2" id "conflito" meta "conflito 2" and the questions: "Q1?" and "Q2?" 
Then I cannot see a roteiro named "Conflito 2" with Id equal to "conflito"

Scenario: Conflict at lixeira on new roteiro creation
Given I am at the roteiros page
And I can see a roteiro with id "conflito_lixeira"
When I click on delete "conflito_lixeira"
Then I can no longer see roteiro "conflito_lixeira" on the roteiro list
And I am still at the roteiro page
Given I cannot see a roteiro named "Conflito Lixeira" with Id equal to "conflito_lixeira"
Then I go to Novo Roteiro page
When I try to create the roteiro with titulo "Conflito Lixeira" id "conflito_lixeira" meta "conflito" and the questions: "Q1?" and "Q2?" 
Then I cannot see a roteiro named "Conflito Lixeira" with Id equal to "conflito_lixeira"