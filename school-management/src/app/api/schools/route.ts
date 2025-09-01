import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const address = formData.get('address') as string;
    const city = formData.get('city') as string;
    const state = formData.get('state') as string;
    const contact = formData.get('contact') as string;
    const email_id = formData.get('email_id') as string;
    const imageCount = parseInt(formData.get('imageCount') as string || '0');
    const imagePaths: string[] = [];

    if (imageCount > 0) {
      // Create schoolImages directory if it doesn't exist
      const uploadDir = path.join(process.cwd(), 'public', 'schoolImages');
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (error) {
        // Directory might already exist
      }

      // Process each image
      for (let i = 0; i < imageCount; i++) {
        const image = formData.get(`image_${i}`) as File;
        if (image && image.size > 0) {
          // Generate unique filename
          const timestamp = Date.now();
          const fileName = `${timestamp}-${i}-${image.name}`;
          const imagePath = `/schoolImages/${fileName}`;

          // Save the file
          const bytes = await image.arrayBuffer();
          const buffer = Buffer.from(bytes);
          await writeFile(path.join(uploadDir, fileName), buffer);
          
          imagePaths.push(imagePath);
        }
      }
    }

    // Convert array to JSON string for storage
    const imagePathsJson = JSON.stringify(imagePaths);

    // Insert into database
    const [result] = await db.execute(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, imagePathsJson, email_id]
    );

    return NextResponse.json({ 
      success: true, 
      message: 'School added successfully',
      id: (result as any).insertId 
    });
  } catch (error) {
    console.error('Error adding school:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error adding school', 
        error: error instanceof Error ? error.message : 'Unknown error',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const [rows] = await db.execute('SELECT * FROM schools ORDER BY created_at DESC');
    return NextResponse.json({ success: true, schools: rows });
  } catch (error) {
    console.error('Error fetching schools:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error fetching schools',
        error: error instanceof Error ? error.message : 'Unknown error',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}
