Feature: As a professor
         I want to update roteiros
         So that I can have a better management of a roteiro

Scenario: Updating a mistakenly created roteiro's name
Given I am at the roteiros page
Given I cannot see a roteiro named "Testss" with Id equal to "test"
Then I go to Novo Roteiro page
And I try to create the roteiro with titulo "Testss" id "test" meta "MA" and the questions: "Q1?" and "Q2?"
Then I can see the roteiro "Testss" with id "test" on the list at Roteiro page
And I select the edit button of the roteiro with id "test"
Then I am at the update roteiros page
When I try to update the name of the roteiro with "Tests"
And I confirm my changes
Then I can see a roteiro with the titulo "Tests" and id "test" in the roteiros list

Scenario: Updating a roteiro adding an extra question
Given I am at the roteiros page
Given I can see a roteiro with ID "test" in the roteiros list
Then I select the edit button of the roteiro with id "test"
And I am at the update roteiros page
When I try to update the roteiro adding the question: "Q3?"
And I confirm my changes
Then I can see a roteiro with id "test" with question "Q3?" in the roteiros list