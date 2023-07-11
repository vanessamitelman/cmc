import { createClient } from 'contentful';
// import { contentTypeObj, clientObj } from './client';

interface ClientI {
  space: string;
  accessToken: string;
}
interface ContentTypeI {
  content_type: string;
}
export const clientObj: ClientI = {
  space: 'arw5tmqsoy9e',
  accessToken: '8rJFvhxfbfqsNT6H48NKSjq64AcBd5tnopzvSNsSNcE'
};
export const contentTypeObj: ContentTypeI = {
  content_type: 'cmcCategories'
};
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
