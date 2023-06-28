import { getData } from './getData';
import './style.css';

interface PriceI {
  title: string;
  price: number | null;
  discount: string | null;
}
interface CategoriesI {
  alt: string;
  description: string | null;
  title: string;
  subtitle: string;
  url: string;
  pricesData: PriceI[];
}
const data = await getData();
console.log(data);
const categories = document.getElementById('categories');

const category = (item: CategoriesI): void => {
  const dialog = document.getElementById('priceList') as HTMLDialogElement;
  const backdrop = document.querySelector('.backdrop');
  const closeDialog = document.getElementById('closePriceList');
  //create category
  const category = document.createElement('div');
  category.classList.add('category');

  //create image
  const image = document.createElement('div');
  image.classList.add('image');
  const img = document.createElement('img');
  img.src = item.url;
  img.alt = item.alt;
  image.appendChild(img);

  //create title
  const title = document.createElement('div');
  title.classList.add('title');
  const h3 = document.createElement('h3');
  h3.innerHTML = `<span>${item.subtitle}</span> ${item.title}`;
  title.appendChild(h3);

  //create description
  const description = document.createElement('div');
  description.textContent = item.description;
  description.classList.add('description');

  category.appendChild(image);
  category.appendChild(title);
  category.appendChild(description);
  categories?.appendChild(category);
  category.addEventListener('click', (e) => {
    dialog?.showModal();
    // backdrop.classList.add('show');
  });
  closeDialog?.addEventListener('click', (e) => {
    dialog?.close();
  });
};
// data?.map((item) => {
//   category(item);
// });
