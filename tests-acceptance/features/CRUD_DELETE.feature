Feature: As a professor
         I want to delete and restore roteiros
         So i can have a better usability of the roteiros feature

Scenario: Move Roteiro to Lixeira 
	Given I am at the roteiros page
	Given I can see a roteiro with id "lixeira_teste"
	When I click on delete "lixeira_teste"
	Then I can no longer see roteiro "lixeira_teste" on the roteiro list
    Then I am still at the roteiro page

Scenario: Go to Lixeira Page
    Given I am at the roteiros page
    When I click on the Lixeira Button
    Then I am Redirected to Lixeira Page

Scenario: Permanently Delete One Roteiro
    Given I am at the roteiros page
    Given I cannot see a roteiro named "Eng. Requisitos" with Id equal to "eng_requisitos"
    Then I go to Novo Roteiro page
    When I try to create the roteiro with titulo "Eng. Requisitos" id "eng_requisitos" meta "Eng. Req." and the questions: "Q1?" and "Q2?" 
    Then I can see the roteiro "Eng. Requisitos" with id "eng_requisitos" on the list at Roteiro page 
	When I click on delete "eng_requisitos"
	Then I can no longer see roteiro "eng_requisitos" on the roteiro list
    When I click on the Lixeira Button
    Then I am Redirected to Lixeira Page
    Then I select the roteiro with id "eng_requisitos"
    When I click on the Delete Button
    Then I can no longer see the roteiro with id "eng_requisitos"
	Then I'm still at the Lixeira Page


Scenario: Restore One Roteiro from Lixeira
    Given I am at the roteiros page
    And I cannot see a roteiro named "Soft. Service" with Id equal to "soft_service"
    Then I go to Novo Roteiro page
    And I try to create the roteiro with titulo "Soft. Service" id "soft_service" meta "Soft. Serv." and the questions: "Q1?" and "Q2?" 
    Then I can see the roteiro "Soft. Service" with id "soft_service" on the list at Roteiro page 
	When I click on delete "soft_service"
	Then I can no longer see roteiro "soft_service" on the roteiro list
    Then I click on the Lixeira Button
    And I am Redirected to Lixeira Page
    Then I select the roteiro with id "soft_service"
    And I click on the Restore Button
    Then I can no longer see the roteiro with id "soft_service"
    When I am at the roteiros page
	Then I can see the roteiro "Soft. Service" with id "soft_service" on the list at Roteiro page 