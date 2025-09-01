import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/schools - Request received');
    
    const formData = await request.formData();
    console.log('FormData parsed successfully');
    
    const name = formData.get('name') as string;
    const address = formData.get('address') as string;
    const city = formData.get('city') as string;
    const state = formData.get('state') as string;
    const contact = formData.get('contact') as string;
    const email_id = formData.get('email_id') as string;
    const imageCount = parseInt(formData.get('imageCount') as string || '0');
    
    console.log('Form data extracted:', { name, address, city, state, contact, email_id, imageCount });

    // Process images by converting to base64 for database storage
    const imagePaths: string[] = [];
    
    // Try to process images, but don't fail the entire request if images fail
    try {
      if (imageCount > 0) {
        console.log(`Processing ${imageCount} images`);
        for (let i = 0; i < imageCount; i++) {
          const image = formData.get(`image_${i}`) as File;
          if (image && image.size > 0) {
            try {
              console.log(`Processing image ${i}: ${image.name}, size: ${image.size}`);
              // Check file size (limit to 5MB - reasonable for web images)
              if (image.size > 5 * 1024 * 1024) {
                console.warn(`Image ${i} too large (${image.size} bytes), skipping`);
                continue;
              }
              
              const bytes = await image.arrayBuffer();
              const buffer = Buffer.from(bytes);
              const base64 = buffer.toString('base64');
              const mimeType = image.type || 'image/jpeg';
              const dataUrl = `data:${mimeType};base64,${base64}`;
              
              imagePaths.push(dataUrl);
              console.log(`Image ${i} processed successfully, size: ${dataUrl.length} chars`);
            } catch (imageError) {
              console.error(`Error processing image ${i}:`, imageError);
              // Continue processing other images
            }
          }
        }
      }
    } catch (imageProcessingError) {
      console.error('Image processing failed entirely, continuing without images:', imageProcessingError);
      // Clear any partial results and continue
      imagePaths.length = 0;
    }

    // Convert array to JSON string for storage
    const imagePathsJson = JSON.stringify(imagePaths);
    console.log('Image paths JSON:', imagePathsJson);

    console.log('Attempting database insert...');
    // Insert into database
    const [result] = await db.execute(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, imagePathsJson, email_id]
    );

    console.log('Database insert successful:', result);

    return NextResponse.json({ 
      success: true, 
      message: 'School added successfully',
      id: (result as any).insertId 
    });
  } catch (error) {
    console.error('Error adding school:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error adding school', 
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
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
