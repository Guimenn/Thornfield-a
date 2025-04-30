import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { whiskyId, quantityToSubtract } = await request.json();
    console.log('Received request:', { whiskyId, quantityToSubtract });

    // Convert whiskyId to string to ensure consistent comparison
    const idToFind = String(whiskyId);

    const filePath = path.join(process.cwd(), 'app/data/whiskies.json');
    console.log('File path:', filePath);
    
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    console.log('Current data:', data);

    const whiskyIndex = data.whiskies.findIndex((w: any) => String(w.id) === idToFind);
    console.log('Whisky index:', whiskyIndex);
    
    if (whiskyIndex === -1) {
      console.error('Whisky not found');
      return NextResponse.json({ success: false, error: 'Whisky not found' }, { status: 404 });
    }

    if (data.whiskies[whiskyIndex].quantity < quantityToSubtract) {
      console.error('Not enough quantity in stock');
      return NextResponse.json({ success: false, error: 'Not enough quantity in stock' }, { status: 400 });
    }

    console.log('Current quantity:', data.whiskies[whiskyIndex].quantity);
    data.whiskies[whiskyIndex].quantity -= quantityToSubtract;
    console.log('New quantity:', data.whiskies[whiskyIndex].quantity);
    
    // Ensure the file exists and is writable
    if (!fs.existsSync(filePath)) {
      console.error('File does not exist:', filePath);
      return NextResponse.json({ success: false, error: 'File not found' }, { status: 500 });
    }

    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log('File updated successfully');
    } catch (writeError) {
      console.error('Error writing to file:', writeError);
      return NextResponse.json({ success: false, error: 'Error writing to file' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating whisky quantity:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
} 