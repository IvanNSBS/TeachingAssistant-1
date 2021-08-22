Feature: As a professor
         I want to register roteiros
         So i can give exercises to students

Scenario: Creating new roteiro
Given I am at the roteiros page
Given I cannot see a roteiro named "Requisitos" with Id equal to "requisitos"
Then I go to Novo Roteiro page
When I try to create the roteiro with titulo "Requisitos" id "requisitos" meta "requisitos" and the questions: "Q1?" and "Q2?" 
Then I can see the roteiro "Requisitos" with id "requisitos" on the list at Roteiro page 