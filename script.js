'use strict';


const title = document.getElementsByTagName('h1')[0];

const buttonPlus = document.querySelector('screen-btn')
const otherItemsPercent = document.querySelectorAll('.other-items.number')
const otherItemsNumber = document.querySelectorAll('.other-items.number')
const screenTypeSelect = document.querySelector('.views-select')
const inputScreenSelect = document.querySelector('.screen-count')

const total = document.getElementById('total');
const totalScreenCount = document.getElementById('total-count');
const totalCountOther = document.getElementById('total-count-other');
const fullTotalCount = document.getElementById('total-full-count');
const totalCountRollback = document.getElementById('total-count-rollback');

const allCB = document.querySelectorAll('.custom-checkbox');
const adaptiveTabletCB = document.getElementsByClassName('custom-checkbox')[0]
const adaptiveMobileCB = document.getElementsByClassName('custom-checkbox')[1]
const yandexCounterCB = document.getElementsByClassName('custom-checkbox')[2]
const googleCounterCB = document.getElementsByClassName('custom-checkbox')[3]
const formSenderCB = document.getElementsByClassName('custom-checkbox')[4]
const serverUploadCB = document.getElementsByClassName('custom-checkbox')[5]
const testingCB = document.getElementsByClassName('custom-checkbox')[6]
const cmsCB = document.getElementsByClassName('custom-checkbox')[7]

const inputRange = document.querySelector('.rollback input');
const inputRangeValue = document.querySelector('.rollback .range-value');

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];

let screens = document.querySelector('.screen');
let reg = /[0-9]/g;

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 0,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    services: 0,

    start: function () {
        appData.asking()
        appData.getScreenType()
        appData.getScreenCount();
        appData.getAdditionalPrice();
        appData.render();
        appData.getInputRange();
    },

    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num)
    },

    asking: function () {
            do {
                appData.services = +prompt("Сколько будет стоить данная работа?", 10000);
                
            } while (appData.services == 0 || typeof(appData.services) == 'undefined' || isNaN(appData.services));
    },

    getScreenPrice: function () {
        appData.screenPrice = appData.screens[0].count * appData.screens[0].price;
    },

    getScreenType: function () {
        screenTypeSelect.onchange = function() {
            if (this.getElementsByTagName('option')[0].selected) {
                inputScreenSelect.value = '';
            }
            appData.screens = [];
            let index = this.selectedIndex;
            let options = this.options;
            let price = this.value;
            let text = options[index].textContent
            let length = text.length - 10
            appData.screens.push({ count: 1, name: text.substr(0, length), price: Number(price) })
            appData.getScreenCount();
        }
    },

    getScreenCount: function () {
        if (screenTypeSelect.getElementsByTagName('option')[0].selected) {
            inputScreenSelect.disabled = true;
        } else {
            inputScreenSelect.disabled = false;

        inputScreenSelect.onkeypress= function(event){
            event= event || window.event;
            if (event.charCode && (event.charCode < 48 || event.charCode > 57))
            return false;
        };
            
        inputScreenSelect.onkeypress= function(event){
            event= event || window.event;
            if (event.charCode && (event.charCode < 48 || event.charCode > 57))
            return false;
        };
        
            inputScreenSelect.onchange = function() {
                appData.screens[0].count = 1;
                appData.screens[0].count = Number(this.value)
                appData.getScreenPrice();
        }
    }
    },

    getAdditionalPrice: function () {
        adaptiveTabletCB.onchange = function() {
            if (this.checked) {
                appData.servicePercentPrice += 10;
            } else {
                appData.servicePercentPrice -= 10;
            }
        }

        adaptiveMobileCB.onchange = function() {
            if (this.checked) {
                appData.servicePercentPrice += 20;
            } else {
                appData.servicePercentPrice -= 20;
            }
        }

        yandexCounterCB.onchange = function() {
            if (this.checked) {
                appData.allServicePrices += 300;
            } else {
                appData.allServicePrices -= 300;
            }
        }

        googleCounterCB.onchange = function() {
            if (this.checked) {
                appData.allServicePrices += 400;
            } else {
                appData.allServicePrices -= 400;
            }
        }

        formSenderCB.onchange = function() {
            if (this.checked) {
                appData.allServicePrices += 200;
            } else {
                appData.allServicePrices -= 200;
            }
        }

        serverUploadCB.onchange = function() {
            if (this.checked) {
                appData.allServicePrices += 300;
            } else {
                appData.allServicePrices -= 300;
            }
        }

        testingCB.onchange = function() {
            if (this.checked) {
                appData.allServicePrices += 300;
            } else {
                appData.allServicePrices -= 300;
            }
        }

        cmsCB.onchange = function() {
            if (this.checked) {
                
            } else {
                
            }
        }
    },

    getFullPrice: function () {
        appData.fullPrice = appData.screenPrice + appData.allServicePrices + appData.services;
        appData.fullPrice = appData.fullPrice + (appData.fullPrice * appData.servicePercentPrice) / 100;
    },

    getServicePercentPrice: function () {
        return Math.ceil(appData.fullPrice - (appData.fullPrice * appData.rollback) / 100);
    },

    render: function () {
        startBtn.addEventListener('click', function() {
            appData.getFullPrice();
            totalScreenCount.value = Number(inputScreenSelect.value);
            totalCountOther.value = appData.allServicePrices;
            total.value = appData.services;
            fullTotalCount.value = appData.fullPrice;
            totalCountRollback.value = appData.getServicePercentPrice();
            resetBtn.style.display = "flex";
        })
        resetBtn.addEventListener('click', function() {
            allCB.forEach(e => {
                e.checked = false;
            })
            appData.screens = [];
            appData.screenPrice = 0;
            appData.allServicePrices = 0;
            appData.fullPrice = 0;
            inputScreenSelect.value = '';
            inputScreenSelect.disabled = true;
            appData.servicePercentPrice = 0;
            totalScreenCount.value = 0;
            totalCountOther.value = 0;
            total.value = 0;
            fullTotalCount.value = 0;
            totalCountRollback.value = 0;
            screenTypeSelect.getElementsByTagName('option')[0].selected = 'selected';
            inputRange.value = 0;
            inputRangeValue.innerText = '0%';
            appData.rollback = 0;
            this.style.display = 'none';
            
        })
    },

    getInputRange: function () {
        inputRange.addEventListener("change", function() {
            inputRangeValue.innerText = this.value + "%";
            appData.rollback = Number(this.value);
        });
    }

};


window.onload = function() {
    appData.start();
}
