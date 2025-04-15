import fs from 'fs';
import path from 'path';

interface Whisky {
  id: string;
  name: string;
  description: string;
  image: string;
  year: number;
  price: number;
  tasting_notes: string[];
  icon: string;
  quantity: number;
}

interface WhiskyData {
  whiskies: Whisky[];
}

export async function updateWhiskyQuantity(whiskyId: string, quantityToSubtract: number): Promise<boolean> {
  try {
    const filePath = path.join(process.cwd(), 'app/data/whiskies.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data: WhiskyData = JSON.parse(fileContent);

    const whiskyIndex = data.whiskies.findIndex(w => w.id === whiskyId);
    
    if (whiskyIndex === -1) {
      console.error('Whisky not found');
      return false;
    }

    if (data.whiskies[whiskyIndex].quantity < quantityToSubtract) {
      console.error('Not enough quantity in stock');
      return false;
    }

    data.whiskies[whiskyIndex].quantity -= quantityToSubtract;
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error updating whisky quantity:', error);
    return false;
  }
} 