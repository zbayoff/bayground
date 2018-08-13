/*--Module Goal----*/
/*
    This module will deal a 5-card hand to two players.
    
    The module will compute the best hand among the two players
    and output the result.
    
    The results will be stored in local storage to keep a tally on who wins each hand. 

*/

/* Functionality...*/
/*
        1. Create a deck of cards.
        2. Deal 5-cards to each player.
        3. Find best hand.
        4. Display/store result.
        
*/

/*var deck = {"hearts" : ["A",1,2,3,4,5,6,7,8,9,10,"J","Q","K"], "clubs" : ["A",1,2,3,4,5,6,7,8,9,10,"J","Q","K"], "diamonds" : ["A",1,2,3,4,5,6,7,8,9,10,"J","Q","K"], "spades" : ["A",1,2,3,4,5,6,7,8,9,10,"J","Q","K"]};

console.log(deck);*/

/*const deck = function () {
  let cardNames = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  let cardVals = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
  let cardSuits = ["hearts", "clubs", "diamonds", "spades"];
  let cards = [];
  
  for (let i = 0; i < cardSuits.length; i++) {
    
    for (let j = 0; j < cardVals.length; j++) {
      cards.push({"suit": cardSuits[i], "value": cardVals[j], "name": cardNames[j]});
    }
    
  }
  
  return cards;
  
}

console.log(deck());*/







/*const deck = function () {
  let cardVals = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  let cardSuits = ["hearts", "clubs", "diamonds", "spades"];
  let cards = {};
  
  for (let i = 0; i < cardSuits.length; i++) {
    cards[cardSuits[i]] = cardVals;
  }
  
  return cards;
  
}




console.log(deck());*/

