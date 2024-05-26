"use client";
// async function checkAccess(pathname) {
//     try {
//         // Make a POST request to your backend endpoint to check access
//         const response = await fetch('/api/check-access', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ pathname })
//         });

import { useCallback } from "react";

//         // Check if the request was successful
//         if (response.ok) {
//             // Parse the response
//             const data = await response.json();
//             // Check the access status
//             if (data.accessAllowed) {
//                 console.log('Access allowed');
//                 // Do something if access is allowed
//             } else {
//                 console.log('Access denied');
//                 // Do something if access is denied
//             }
//         } else {
//             console.error('Error checking access:', response.statusText);
//             // Handle errors
//         }
//     } catch (error) {
//         console.error('Error checking access:', error.message);
//         // Handle errors
//     }
// }
