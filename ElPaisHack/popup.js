function id(id_)
{
  return document.getElementById(id_);
}

let n = id('n');

id('add').addEventListener('click', function()
{
  add_articles(n.value);
});