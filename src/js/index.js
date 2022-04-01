console.log("Dev m3");
const axios = require("axios");

import { Product } from "./classes/product";

const babel = require("babel-polyfill");

class App {
  constructor() {
    this.productBody = document.querySelector(".results");
    this.btColorFilter = document.getElementById("btColorFilter");
    this.price = document.querySelector(".price-renge");
    this.priceButtom = document.querySelectorAll(".price-opcs");
    this.btnFiltesMobi = document.getElementById("filters");
    this.btnSizeMobi = document.getElementById("btnSizes");
    this.btnOrder = document.getElementById("orders");
    this.btnRangedPrice = document.getElementById("priceRnged");
    this.btnCloser = document.getElementById("btnCloser");
    this.btnCloserOrder = document.getElementById("btnCloserOrder");
    this.btnNew = document.getElementById("btnRecente");
    this.btnBiggest = document.getElementById("btnBiggest");
    this.btnLowest = document.getElementById("btnLowest");
    this.selected = document.querySelector(".select-selected");
    this.serlectItens = document.querySelector(".select-items");
    this.optionAll = document.querySelectorAll(".option");
    this.count = localStorage.setItem("products", "0");
    this.valueBag = document.getElementById("number-span");
    this.buttonMobi = document.querySelector("[name=submit]");
    this.formMobi = document.getElementById("form-mobi");
    this.colse = document.getElementById("btnClose");
    this.colorsMobi = document.getElementsByClassName("btn-coresMobi");
    this.btnMor = document.getElementById("morItens");
    this.buyProds();
    this.eventosDeButoon();
  }
  eventosDeButoon(data) {
    const closeOrder = this.btnCloserOrder;
    const btColor = this.btColorFilter;
    const btnSizeMob = this.btnSizeMobi;
    const btnMobi = this.btnFiltesMobi;
    const btnRanged = this.btnRangedPrice;
    const btnClose = this.btnCloser;
    const btnOrder = this.btnOrder;
    const newOrder = this.btnNew;
    const Biggest = this.btnBiggest;
    const Lowest = this.btnLowest;
    const selected = this.selected;
    const colorsMobi = this.colorsMobi;

    for (var btnColor of colorsMobi) {
      btnColor.onclick = (event) => {
        for (var i = 0; i < event.length; i++) {
          event.checked = true;
        }
        console.log(event.target.dataset.color);

        this.productBody.innerHTML = "";
        const closer = document.getElementById("filtersIner");
        closer.classList.remove("activ");
        const order = document.getElementById("colorIner");
        order.classList.remove("activ");
        const novo = data.filter((item) => {
          this.buyProds(data);
          if (item.color == event.target.dataset.color) {
            const character = new Product(item);
            this.productBody.innerHTML += character.createProduct();
          }
        });

        return novo;
      };
    }
    for (let btnSize of document.getElementsByClassName("size-butonMobi")) {
      btnSize.onclick = (event) => {
        this.productBody.innerHTML = "";
        let sizes = event.target.dataset.size;
        console.log(sizes);

        this.productBody.innerHTML = "";
        const closer = document.getElementById("filtersIner");
        closer.classList.remove("activ");
        const order = document.getElementById("colorIner");
        order.classList.remove("activ");
        const novo = data.forEach((item) => {
          if (sizes == item.size[0] || sizes == item.size[1]) {
            const character = new Product(item);
            this.productBody.innerHTML += character.createProduct();
          }
          this.buyProds(data);
        });

        return novo;
      };
    }
    for (let btnRanged of document.getElementsByClassName("price-renge-mobi")) {
      btnRanged.onclick = (event) => {
        let priceRenged = event.target.dataset.num;

        this.productBody.innerHTML = "";
        const closer = document.getElementById("filtersIner");
        closer.classList.remove("activ");
        const order = document.getElementById("colorIner");
        order.classList.remove("activ");
        const novo = data.filter((item) => {
          if (priceRenged == "50") {
            if (item.price < priceRenged) {
              const character = new Product(item);
              this.productBody.innerHTML += character.createProduct();
            }
          }
          if (priceRenged == "51") {
            if (item.price < "150" && item.price >= priceRenged) {
              const character = new Product(item);
              this.productBody.innerHTML += character.createProduct();
            }
          }
          if (priceRenged == "151") {
            if (item.price > "151" && item.price <= priceRenged) {
              const character = new Product(item);
              this.productBody.innerHTML += character.createProduct();
            }
          }
          if (priceRenged == "301") {
            if (item.price < "500" && item.price >= priceRenged) {
              const character = new Product(item);
              this.productBody.innerHTML += character.createProduct();
            }
          }
          if (priceRenged == "500") {
            if (item.price >= priceRenged) {
              const character = new Product(item);
              this.productBody.innerHTML += character.createProduct();
            }
          }
          this.buyProds(data);
        });

        return novo;
      };
    }

    selected.onclick = () => {
      const inerItens = this.serlectItens;
      const listItens = this.optionAll;
      inerItens.classList.toggle("activ");
      selected.classList.toggle("activ");
      listItens.forEach((i) => {
        i.onclick = () => {
          this.productBody.innerHTML = "";
          const item = document.querySelector(".radio-select").value;

          inerItens.classList.remove("activ");
          selected.innerHTML = i.querySelector("label").innerHTML;
          selected.classList.remove("activ");
          if (item == "menor") {
            this.productBody.innerHTML = "";
            let priceArray = data.sort(function (a, b) {
              return b.price < a.price ? 1 : -1;
            });
            priceArray.forEach((item) => {
              const character = new Product(item);
              this.productBody.innerHTML += character.createProduct();
            });
            this.buyProds(data);
          } else if (item == "maior") {
            this.productBody.innerHTML = "";
            let priceArray = data.sort(function (a, b) {
              return b.price > a.price ? 1 : -1;
            });
            priceArray.forEach((item) => {
              const character = new Product(item);
              this.productBody.innerHTML += character.createProduct();
            });
            this.buyProds(data);
          } else if (item == "recente") {
            this.productBody.innerHTML = "";
            let newArray = data.sort(function (a, b) {
              return b.date > a.date ? 1 : -1;
            });
            newArray.forEach((item) => {
              const character = new Product(item);
              this.productBody.innerHTML += character.createProduct();
            });
            this.buyProds(data);
          }
        };
      });
    };
    Lowest.onclick = () => {
      this.productBody.innerHTML = "";
      const closer = document.getElementById("filtersIner");
      closer.classList.remove("activ");
      const order = document.getElementById("orderFilter");
      order.classList.remove("activ");
      let priceArray = data.sort(function (a, b) {
        return b.price < a.price ? 1 : -1;
      });
      priceArray.forEach((item) => {
        const character = new Product(item);
        this.productBody.innerHTML += character.createProduct();
      });
      this.buyProds(data);
    };
    Biggest.onclick = () => {
      this.productBody.innerHTML = "";
      const closer = document.getElementById("filtersIner");
      closer.classList.remove("activ");
      const order = document.getElementById("orderFilter");
      order.classList.remove("activ");
      let priceArray = data.sort(function (a, b) {
        return b.price > a.price ? 1 : -1;
      });
      priceArray.forEach((item) => {
        const character = new Product(item);
        this.productBody.innerHTML += character.createProduct();
      });
      this.buyProds(data);
    };
    newOrder.onclick = () => {
      this.productBody.innerHTML = "";
      const closer = document.getElementById("filtersIner");
      closer.classList.remove("activ");
      const order = document.getElementById("orderFilter");
      order.classList.remove("activ");
      let newArray = data.sort(function (a, b) {
        return b.date > a.date ? 1 : -1;
      });
      newArray.forEach((item) => {
        const character = new Product(item);
        this.productBody.innerHTML += character.createProduct();
      });
      this.buyProds(data);
    };
    btnOrder.onclick = () => {
      const btn = document
        .getElementById("filtersIner")
        .classList.toggle("activ");
      const order = document.getElementById("orderFilter");
      order.classList.add("activ");
    };

    btnMobi.onclick = () => {
      const btn = document.getElementById("filtersIner");
      btn.classList.toggle("activ");
      const color = document.getElementById("colorIner");
      color.classList.add("activ");
    };
    btnSizeMob.onclick = () => {
      const btnSizes = document.getElementById("inerSize");
      btnSizes.classList.toggle("activ");
      const inerSize = document.getElementById("btnSizes");
      inerSize.classList.toggle("activ");
    };
    btColor.onclick = () => {
      const color = document.getElementById("inerColor");
      color.classList.toggle("activ");

      const divIner = document
        .getElementById("btColorFilter")
        .classList.toggle("activ");
    };
    btnRanged.onclick = () => {
      const ranged = document.getElementById("inerRanged");
      ranged.classList.toggle("activ");
      const inerRanged = document.getElementById("priceRnged");
      inerRanged.classList.toggle("activ");
    };
    closeOrder.onclick = () => {
      const closer = document.getElementById("filtersIner");
      closer.classList.remove("activ");
      const order = document.getElementById("orderFilter");
      order.classList.remove("activ");
    };
    btnClose.onclick = () => {
      const closer = document.getElementById("filtersIner");
      closer.classList.remove("activ");
      const color = document.getElementById("colorIner");
      color.classList.remove("activ");
    };

    for (let btnColor of document.getElementsByClassName("btn-cores")) {
      btnColor.onclick = (event) => {
        for (var i = 0; i < event.length; i++) {
          event.checked = true;
        }

        this.productBody.innerHTML = "";
        const novo = data.filter((item) => {
          this.buyProds(data);
          if (item.color == event.target.id) {
            const character = new Product(item);
            this.productBody.innerHTML += character.createProduct();
          }
        });

        return novo;
      };
    }
    for (let btnSize of document.getElementsByClassName("select-size")) {
      btnSize.onclick = (event) => {
        this.productBody.innerHTML = "";
        let sizes = event.target.dataset.num;
        const novo = data.forEach((item) => {
          this.buyProds(data);
          if (sizes == item.size[0] || sizes == item.size[1]) {
            const character = new Product(item);
            this.productBody.innerHTML += character.createProduct();
          }
          this.buyProds(data);
        });
        return novo;
      };
    }
    for (let btnRanged of document.getElementsByClassName("priceBtn")) {
      btnRanged.onclick = (event) => {
        this.productBody.innerHTML = "";
        let priceRenged = event.target.id;
        const novo = data.filter((item) => {
          if (priceRenged == "50") {
            if (item.price < priceRenged) {
              const character = new Product(item);
              this.productBody.innerHTML += character.createProduct();
            }
          }
          if (priceRenged == "51") {
            if (item.price < "150" && item.price >= priceRenged) {
              const character = new Product(item);
              this.productBody.innerHTML += character.createProduct();
            }
          }
          if (priceRenged == "151") {
            if (item.price > "151" && item.price <= priceRenged) {
              const character = new Product(item);
              this.productBody.innerHTML += character.createProduct();
            }
          }
          if (priceRenged == "301") {
            if (item.price < "500" && item.price >= priceRenged) {
              const character = new Product(item);
              this.productBody.innerHTML += character.createProduct();
            }
          }
          if (priceRenged == "500") {
            if (item.price >= priceRenged) {
              const character = new Product(item);
              this.productBody.innerHTML += character.createProduct();
            }
          }
          this.buyProds(data);
        });

        return novo;
      };
    }
  }

  async getProtudcts() {
    try {
      const response = await axios.get(`http://localhost:5000/products`);
      this.show(response.data);
      this.buyProds(response.data);
      this.eventosDeButoon(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  buyProds(data) {
    for (let buy of document.getElementsByClassName("btn-buy-product")) {
      buy.onclick = (event) => {
        const openModal = document
          .getElementById("modal-buy")
          .classList.add("activ");
        const close = this.colse;
        close.onclick = () => {
          const closer = document.getElementById("modal-buy");
          closer.classList.remove("activ");
        };
        let click = event.target.dataset.id;
        for (const char of data) {
          if (click === char.id) {
            const valueBag = this.valueBag;
            valueBag.innerHTML = "";

            var attempts = parseInt(localStorage.getItem("products"));
            localStorage.setItem("products", ++attempts);

            valueBag.innerHTML = attempts;
            return;
          }
        }
      };
    }
  }

  show(data) {
    this.productBody.innerHTML = "";

    data.forEach((item) => {
      const character = new Product(item);
      this.buyProds(item);
      this.productBody.innerHTML += character.createProduct();
    });
  }
}

const app = new App();
app.getProtudcts();
