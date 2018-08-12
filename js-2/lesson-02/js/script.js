function Container() {
  this.id = "";
  this.className = "";
  this.htmlCode = "";
}

Container.prototype.render = function() {
  return this.htmlCode;
}

Container.prototype.remove = function() {
  // this.htmlCode.remove();
  const element = document.getElementById(this.id);
  element.parentNode.removeChild(element);
}

function Menu(my_id, my_class, my_items) {
  Container.call(this);
  this.id = my_id;
  this.className = my_class;
  this.items = my_items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;

function MenuSubItem(my_href, my_name) {
  Container.call(this);
  this.className = "menu-sub-item";
  this.href = my_href;
  this.name = my_name;
}

MenuSubItem.prototype = Object.create(Container.prototype);
MenuSubItem.prototype.constructor = MenuSubItem;
MenuSubItem.prototype.render = function() {
  return "<li class='" + this.className + "'><a href='" + this.href + "'>" + this.name + "</a></li>";
}

const m_subitem1 = new MenuSubItem("#", "Товар 1");
const m_subitem2 = new MenuSubItem("#", "Товар 2");
const m_subitem3 = new MenuSubItem("#", "Товар 3");
const m_subitems = {
  0: m_subitem1,
  1: m_subitem2,
  2: m_subitem3,
};

function MenuItem(my_href, my_name, my_subitems) {
  Container.call(this);
  this.className = "menu-item";
  this.href = my_href;
  this.name = my_name;
  this.subitems = my_subitems ? my_subitems : false;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;
MenuItem.prototype.render = function() {
  let result = "<li class='" + this.className + "'><a href='" + this.href + "'>" + this.name + "</a>";

  if (this.subitems) {
    result += "<ul class='sub-menu'>";

    for (let item in this.subitems) {
      if (this.subitems[item] instanceof MenuSubItem) {
        result += this.subitems[item].render();
      }
    }

    result += "</ul>"
  }

  result += "</li>";
  return result;
}

const m_item1 = new MenuItem("#", "Главная");
const m_item2 = new MenuItem("#", "Каталог", m_subitems);
const m_item3 = new MenuItem("#", "Галерея");
const m_items = {
  0: m_item1,
  1: m_item2,
  2: m_item3,
};


Menu.prototype.render = function() {
  let result = "<ul class='" + this.className + "'id='" + this.id + "'>";

  for (let item in this.items) {
    if (this.items[item] instanceof MenuItem) {
      result += this.items[item].render();
    }
  }

  result += "</ul>";
  return result;
}

const menu = new Menu("my_menu", "my_class", m_items);
const div = document.write(menu.render());