import type {
  WidgetConfig,
  ProductDetailsWidgetProps,
} from "@medusajs/admin"
import { CurrencyInput, Select, Textarea } from "@medusajs/ui"
import TagInputTextarea from "../components/tag-input-textarea"
import MagicButton from "../components/tag-input-textarea/magic-button"
import  { SetStateAction, useState } from "react";
import { useAdminUpdateProduct } from "medusa-react"
import { Product } from "@medusajs/product";
import CreateProductVariant from "../components/tag-input-textarea/magic-button/second";
import CreateProductOption from "../components/tag-input-textarea/magic-button/create-options";
import TagInput from "../components/tag-input-textarea/secondotag";


const ProductWidget = ({
  product,
  notify,
}: ProductDetailsWidgetProps) => {
  const updateProduct = useAdminUpdateProduct(
    product.id
  )
  const guidataglie = [
    { key: 1, value: "1" },
    { key: 2, value: "2" },
    { key: 3, value: "3" },
    { key: 4, value: "4" },
    { key: 5, value: "5" },
    { key: 6, value: "6" },
    { key: 7, value: "7" }
  ];

  const taglie = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "3XL",
    "4XL"
  ];
  const productId = product.id

  // State to track selected colors
  const [selectedColors, setSelectedColors] = useState([]);

  // State to track selected Guida alle taglie
  const [selectedGuidaTaglieKey, setSelectedGuidaTaglieKey] = useState<string | null>(null);

  // State to track price
  const [prezzo, setPrezzo] = useState<number | null>(null);


  const handleGuidaTaglieChange = (value) => {
    setSelectedGuidaTaglieKey(value);
  };
  const handleColors = (value) =>{
    setSelectedColors(value);
  }
  // Handler for MagicButton click
  const handleMagicButtonClick = () => {
    // Check if all required fields are filled
    if (prezzo !== null && selectedGuidaTaglieKey !== null && selectedColors.length > 0) {
      // Call the function with necessary parameters
    
      notify.success("success", "Dati inseriti");


    } else {
      // Notify user to fill in all required fields
      if(prezzo == null){
        alert("Please fill in all required fields: Prezzo");

      }
      if(selectedGuidaTaglieKey == null){
        alert("Please fill in all required fields:  Guida alle taglie");

      }
      if(selectedColors.length == 0){
        alert("Please fill in all required fields: at least one color.");

      }


    }
  };
  const handleUpdate = (
    taglie : string, colori : string[] ,prezzo :number ,product:string
  ) => {
    updateProduct.mutate({
      variants: {
        title: "Blue",
        prices: {
          amount: 33,
          currency_code :"EUR"
        }[0],
        options: {
          value: colori[0]
        }[0]
      }[0],
    }, {
      onSuccess: ({ product }) => {
        console.log(product.id)
      }
    },)
  }
  return (
    <div className="bg-white p-8 border border-gray-200 rounded-lg">
      <h1 className="text-grey-90 inter-xlarge-semibold">Tasto magico</h1>
      <div className="gap-y-xsmall mb-large mt-base flex flex-col">
        <h2 className="inter-base-semibold">Prezzo</h2>
        <CurrencyInput symbol="€" code="eur" onChange={(event) => setPrezzo(parseFloat(event.target.value))} />

         <h2 className="inter-base-semibold">Guida alle taglie</h2>
        <Select value={selectedGuidaTaglieKey ? selectedGuidaTaglieKey.toString() : undefined} onValueChange={handleGuidaTaglieChange}>
          <Select.Trigger>
            <Select.Value placeholder="Guida alle taglie" />
          </Select.Trigger>
          <Select.Content>
            {guidataglie.map((item) => (
              <Select.Item key={item.key} value={item.key.toString()}>
                {item.value}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>

        <h2 className="inter-base-semibold">Scegli i colori</h2>
        <TagInput onChange={handleColors} />
      </div>
      
      <CreateProductVariant 
      selectedColors={selectedColors}
      prezzo={prezzo}
      selectedGuidaTaglieKey={selectedGuidaTaglieKey}
      productId={productId} />
    </div>
  );
};


export const config: WidgetConfig = {
  zone: "product.details.after",
}

export default ProductWidget