import { createClient } from 'contentful';
import { contentTypeObj, clientObj } from './client';

const client = createClient(clientObj);

const getData = async () => {
  try {
    const { items } = await client.getEntries(contentTypeObj);
    const data = items.map((item: any) => {
      const {
        title,
        subtitle,
        description,
        priceListPermanentTitle,
        image: {
          fields: {
            file: { url },
            title: alt
          }
        },
        prices
      } = item.fields;
      const pricesData = prices?.map((priceItem: any) => {
        const { title, price, discount } = priceItem.fields;
        return { title, price, discount };
      });

      return {
        title,
        subtitle,
        description,
        priceListPermanentTitle,
        url,
        alt,
        pricesData
      };
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export { getData };
