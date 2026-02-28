import admin from 'firebase-admin';
import path from 'path';
import fs from 'fs';

export function getFirebaseAdmin() {
    if (admin.apps.length) return admin.app();

    const serviceAccountPath = path.join(process.cwd(), "explain-with-anything-firebase-adminsdk-fbsvc-1de3b81a37.json");

    if (!fs.existsSync(serviceAccountPath)) {
        throw new Error(`Service account file not found at path: ${serviceAccountPath}`);
    }

    const serviceAccount = JSON.parse(
        fs.readFileSync(serviceAccountPath, 'utf-8')
    );

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });

    return admin.app();
}

export function getFirestoreAdmin() {
    getFirebaseAdmin();
    return admin.firestore();
}