const PrimeNumberModule = (function () {

    'use strict';

    let primeFirstInput = document.querySelector(".project-prime .first-num-js");
    let primeSecondInput = document.querySelector(".project-prime .second-num-js");
    let primeResult = document.querySelector(".project-prime .prime__result-area");
    let primeCalcBtn = document.querySelector(".project-prime .find-button-js");

    primeCalcBtn.addEventListener("click", function () {
        // use parseInt to convert string value from input type number into type number
        primeResult.innerHTML = findPrimes(parseInt(primeFirstInput.value), parseInt(primeSecondInput.value));
    }, false);

    // Reset module on span click close
    let primeSpanClose = document.querySelector(".project-prime .close-js");
    primeSpanClose.addEventListener("click", function () {
        primeFirstInput.value = "";
        primeSecondInput.value = "";
        primeResult.innerHTML = "";
    })


    function isPrime(num) {

        if (num === 0 || num === 1) {
            return;
        }

        if (num % 2 === 0 && num !== 2) {
            return;
        }

        if (num % 3 === 0 && num !== 3) {
            return;
        }

        if (num % 4 === 0 && num !== 4) {
            return;
        }

        if (num % 5 === 0 && num !== 5) {
            return;
        }

        if (num % 6 === 0 && num !== 6) {
            return;
        }

        if (num % 7 === 0 && num !== 7) {
            return;
        }

        if (num % 8 === 0 && num !== 8) {
            return;
        }

        if (num % 9 === 0 && num !== 9) {
            return;
        }

        return true;
    }

    function findPrimes(num1, num2) {

        let primes = [];

        if (num1 < 0 || num2 < 0) {
            return "<p>Negative numbers can't be prime.</p>";
        }

        if (num1 < num2) {
            for (let i = num1; i <= num2; i++) {
                if (isPrime(i)) {
                    primes.push(i);
                }
            }
        } else {
            for (let i = num1; i >= num2; i--) {
                if (isPrime(i)) {
                    primes.push(i);
                }
            }
        }
        return "<p>" + primes.join(", ") + "</p>";
    }


})();