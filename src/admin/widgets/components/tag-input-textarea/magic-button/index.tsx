import React from 'react';
import { useAdminCreateVariant } from 'medusa-react';

// Define an interface for the variant options


interface MagicButtonProps {
  productId: string;
  prezzo: number;
  selectedColors: string[];
  selectedGuidaTaglieKey: string;
  onClick: (
    prezzo: number,
    selectedColors: string[],
    selectedGuidaTaglieKey: string,
    productId: string
  ) => void;
}

const MagicButton: React.FC<MagicButtonProps> = ({
  onClick,
  prezzo,
  selectedColors,
  selectedGuidaTaglieKey,
  productId,
}) => {
  const createVariant = useAdminCreateVariant(productId);

  const handleCreate = () => {
    console.log('Prezzo:', prezzo);
    console.log('Colori selezionati:', selectedColors);
    console.log('Guida alle taglie selezionata:', selectedGuidaTaglieKey);
    
    const pricesCreateReq = {
      currency_code: 'eur',
      amount: prezzo,
    };

    // Build the variant data
    const variant: VariantData[] = [
      {
        title: 'Nome della variante',
        prices: [pricesCreateReq],
        options: selectedColors.map(color => ({
          value: color,
          option_id: 'ID_dell\'opzione',
        })),
      },
    ];

    // Execute the mutation to create the product variant
    createVariant.mutate(
      {
        variant,
      },
      {
        onSuccess: ({ product }) => {
          console.log('Variante creata:', product);
          // Call the onClick callback function if needed
          onClick(prezzo, selectedColors, selectedGuidaTaglieKey, productId);
        },
        onError: (error) => {
          console.error('Errore durante la creazione della variante:', error);
          // Handle errors during variant creation
        },
      }
    );
  };

  return (
    <button
      className="bg-black rounded p-1 text-white"
      onClick={handleCreate}
    >
      Crea Le varianti
    </button>
  );
};

export default MagicButton;
