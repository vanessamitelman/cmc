import { getData } from './getData';
import './style.css';

interface PriceI {
  title: string;
  price: number;
  discount?: string | undefined;
}
interface CategoriesI {
  alt: string;
  description: string | null;
  priceListPermanentTitle: string;
  title: string;
  subtitle: string;
  url: string;
  pricesData: PriceI[] | undefined;
}
const data = await getData();
// console.log(data);
const categories = document.getElementById('categories');

const category = (item: CategoriesI): void => {
  const dialog = document.getElementById('priceList') as HTMLDialogElement;

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
  img.classList.add('categoryImg');
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

  //add click event to open dialog
  category.addEventListener('click', () => {
    const dialogImg = document.getElementById('dialogImg') as HTMLImageElement;
    dialogImg.src = item.url;
    dialogImg.alt = item.title;
    dialogImg.classList.add('categoryImg');
    const { pricesData, title } = item;

    const h1 = document.getElementById('dialogTitle') as HTMLElement;

    h1.textContent = `${item.priceListPermanentTitle} ${title}`;

    const dialogPrices = document.getElementById(
      'dialogPrices'
    ) as HTMLDivElement;
    dialogPrices.innerHTML = '';

    pricesData?.map((priceItem: PriceI) => {
      const { title, price, discount } = priceItem;
      const divTitleWrapper = document.createElement('div');
      divTitleWrapper.classList.add('priceListDivWrapper');

      const divDiscount = document.createElement('div');
      divDiscount.classList.add('priceDiscount');
      if (discount !== undefined) {
        divDiscount.textContent = discount;
      }
      divTitleWrapper.appendChild(divDiscount);

      const divPrice = document.createElement('div');
      divPrice.classList.add('price');
      if (price > 0) {
        divPrice.textContent = `${price} ₪`;
      }
      divTitleWrapper.appendChild(divPrice);
      const divTitle = document.createElement('div');
      divTitle.classList.add('priceTitle');
      divTitle.textContent = title;
      divTitleWrapper.appendChild(divTitle);

      dialogPrices.appendChild(divTitleWrapper);
    });

    dialog?.showModal();
    // backdrop.classList.add('show');
  });
  closeDialog?.addEventListener('click', (e) => {
    dialog?.close();
  });
};
data?.map((item: any): void => {
  category(item);
});
