import React from "react"
import { useAdminCreateVariant, useAdminCreateProductOption, useAdminUpdateProductOption } from "medusa-react"
import { title } from "process"
import { useAdminVariants, useAdminUpdateProduct } from "medusa-react"
import { ProductDetailsWidgetProps } from "@medusajs/admin"
import CreateProductOption from "./create-options"

type CreateVariantData = {
    title: string
    inventory_quantity: number
    prices: {
        amount: number
        currency_code: string
    }[]
    options: {
        option_id: string
        value: string
    }[]
}

type Props = {
    productId: string
    prezzo: number;
    selectedColors: string[];
    selectedGuidaTaglieKey: string;
}

const CreateProductVariant = ({ productId, prezzo, selectedColors, selectedGuidaTaglieKey }: Props) => {

    const createVariant = useAdminCreateVariant(
        productId
    )


    const createOption = useAdminCreateProductOption(
        productId
    )

    // ...
    const taglie = [
        { key: 1, title: "XS" },
        { key: 2, title: "S" },
        { key: 3, title: "M" },
        { key: 4, title: "L" },
        { key: 5, title: "XL" },
        { key: 6, title: "XXL" },
        { key: 7, title: "3XL" },
        { key: 8, title: "4XL" }
    ];



    const handleCreate = (
        prezzo: number,
        selectedColors: string[],
        selectedGuidaTaglieKey: string,
        titles: [string, string],
        taglie: { key: number, title: string }[]
    ) => {
        // Ordina l'array delle taglie in base alla chiave
        const taglieOrdinate = taglie.sort((a, b) => a.key - b.key);
    
        titles.map(title => {
            createOption.mutate({ title }, {
                onSuccess: ({ product }) => {
                    console.log(selectedColors);
                    console.log(product.options);
                    const colorOption = product.options.find(option => option.title === "Colore");
                    if (!colorOption) {
                        console.error("Opzione Colore non trovata.");
                        return;
                    }
                    const coloreid = colorOption.id;
    
                    product.options.map(option => {
                        if (option.title === "Taglia") {
                            console.log("Siamo in taglia");
                            console.log(taglieOrdinate);
    
                            // Utilizziamo un indice separato per iterare attraverso le taglie ordinate
                            let tagliaIndex = 0;
                            const createVariantSequentially = () => {
                                if (tagliaIndex >= taglieOrdinate.length) {
                                    console.log("Creazione delle varianti completata");
                                    return;
                                }
    
                                const taglia = taglieOrdinate[tagliaIndex];
                                console.log("Siamo nella taglia " + taglia.key + " - " + taglia.title);
    
                                selectedColors.forEach(color => {
                                    console.log("Siamo nel colore " + color);
    
                                    const sizeOptionId = option.id;
                                    const colorOptionData = {
                                        value: color,
                                        option_id: coloreid,
                                    };
                                    const sizeOptionData = {
                                        value: taglia.title,
                                        option_id: sizeOptionId,
                                    };
                                    const ultimateData: CreateVariantData = {
                                        title: `${color} _ ${taglia.title}`,
                                        prices: [{ amount: prezzo, currency_code: "eur" }],
                                        options: [sizeOptionData, colorOptionData],
                                        inventory_quantity: 1
                                    };
    
                                    createVariant.mutate(ultimateData, {
                                        onSuccess: ({ product }) => {
                                            console.log("Variante creata:", product.options);
                                            // Fai qualcosa con la variante creata, se necessario
                                            // Aggiungi una piccola pausa di 1000ms (1 secondo) dopo la creazione di ogni variante
                                            setTimeout(() => {
                                                // Chiamata ricorsiva per creare la prossima variante
                                                tagliaIndex++;
                                                createVariantSequentially();
                                            }, 1000);
                                        },
                                        onError: (error) => {
                                            console.error("Errore durante la creazione della variante:", error);
                                            // Gestisci gli errori, se necessario
                                            // Continua con la creazione della prossima variante
                                            tagliaIndex++;
                                            createVariantSequentially();
                                        }
                                    });
                                });
                            };
    
                            // Avvia il processo di creazione delle varianti
                            createVariantSequentially();
                        }
                    });
                },
                onError: (error) => {
                    console.error("Errore durante la creazione dell'opzione:", error);
                    // Gestisci gli errori, se necessario
                }
            });
        });
    };
    


    return (
        <button
            className="bg-black rounded p-1 text-white"
            onClick={() => handleCreate(
                prezzo,
                selectedColors
                , "1",
                ["Colore", "Taglia"],
                taglie, 
            )}
        >
            Crea Le varianti
        </button>
    );
    // ...
}

export default CreateProductVariant