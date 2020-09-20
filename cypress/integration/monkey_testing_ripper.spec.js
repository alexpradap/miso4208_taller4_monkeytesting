describe('Wikipedia under monkeys', function() {
    it('visits wikipedia and survives monkeys', function() {
        cy.visit('https://www.wikipedia.org/');
        cy.wait(1000);
        randomAction(10);
    })
})
function randomAction(monkeys) {

    function randomEvents (selectors, monkeys) {
        let randomEvents = [];
        for (let i = 0; i < monkeys; i++) {
          randomEvents.push(selectors[getRandomInt(0, selectors.length)]);
        }
        console.log(randomEvents);
        return randomEvents;
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    function getRandomStr(length) {
        let randomStr = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
           randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return randomStr;
     }

    let selectors = ['a', 'button', 'input[type=text], input[type=search]'];
    randomEvents(selectors, monkeys).forEach(selector => {
        if (selector == 'a') {
            cy.get('body').then($body => {
                if ($body.find(selector).length > 0) {
                    cy.get(selector).then($events => {
                        var randomEvent = $events.get(getRandomInt(0, $events.length));
                        if(!Cypress.dom.isHidden(randomEvent)) {
                            cy.wrap(randomEvent).click({force: true});
                        }
                        cy.wait(500);
                    });
                }
            });
        }
        else if (selector == 'button') {
            cy.get('body').then($body => {
                if ($body.find(selector).length > 0) {
                    cy.get(selector).then($events => {
                        var randomEvent = $events.get(getRandomInt(0, $events.length));
                        if(!Cypress.dom.isHidden(randomEvent)) {
                            cy.wrap(randomEvent).click({force: true});
                        }
                        cy.wait(500);
                    });
                }
            });
        }
        else if (selector == 'select') {
            cy.get('body').then($body => {
                if ($body.find(selector).length > 0) {
                    cy.get(selector).then($events => {
                        var randomEvent = $events.get(getRandomInt(0, $events.length));
                        cy.wrap(randomEvent).get('option').then($options => {
                            var randomOption = $options.get(getRandomInt(0, $options.length));
                            cy.wrap(randomOption)
                            .invoke('attr', 'value')
                            .then($value => {
                                cy.wrap(randomEvent).select($value);
                            });
                        });
                        cy.wait(500);
                    });
                }
            });
        }
        else if (selector == 'input[type=text], input[type=search]') {
            cy.get('body').then($body => {
                if ($body.find(selector).length > 0) {
                    cy.get(selector).then($events => {
                        var randomEvent = $events.get(getRandomInt(0, $events.length));
                        cy.wrap(randomEvent).clear();
                        cy.wrap(randomEvent).type(getRandomStr(getRandomInt(1,48)) + '{enter}');
                        cy.wait(500);
                    });
                }
            });
        }
    });
}