const { supabase } = require('../supabaseClient');
const fs = require('fs');
const path = require('path');

const uploadFile = async (file) => {
  try {
    // Read the file from disk
    const fileBuffer = fs.readFileSync(file.path);

    // Generate a unique filename
    const fileExt = file.originalname.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `documents/${fileName}`;

    console.log('Attempting storage upload with:', {
      filePath,
      fileSize: fileBuffer.length,
      mimetype: file.mimetype
    });

    // Upload file to Supabase storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, fileBuffer, {
        contentType: file.mimetype,
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Storage upload DETAILED error:', {
        error: uploadError,
        type: typeof uploadError,
        keys: Object.keys(uploadError)
      });
      throw uploadError;
    }

    console.log('Storage upload successful', uploadData);

    // Prepare metadata for insertion
    const fileMetadata = {
      name: file.originalname,
      size: file.size,
      type: file.mimetype,
      path: filePath,
      metadata: {
        originalName: file.originalname,
        uploadedVia: 'web-app'
      }
    };

    console.log('Attempting to insert metadata:', fileMetadata);

    // Insert file metadata into documents table
    const { data, error: metadataError } = await supabase
      .from('documents')
      .insert(fileMetadata)
      .select();

    if (metadataError) {
      console.error('Metadata insert DETAILED error:', {
        error: metadataError,
        type: typeof metadataError,
        keys: Object.keys(metadataError)
      });
      throw metadataError;
    }

    console.log('Metadata insert successful', data);

    // Remove the local file after upload
    fs.unlinkSync(file.path);

    return { uploadData, metadataInserted: data };
  } catch (error) {
    console.error('COMPREHENSIVE file upload error:', {
      error,
      type: typeof error,
      keys: Object.keys(error),
      stringified: JSON.stringify(error)
    });
    throw error;
  }
};

module.exports = { uploadFile };