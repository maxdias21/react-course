import RSCDemo from "@/app/components/RSCDemo";
import ClientDemo from "@/app/components/ClientDemo";
import DataFetchingDemo from "@/app/components/DataFetchingDemo";
import ServerActionsDemo from "@/app/components/ServerActionsDemo";
import UsePromiseDemo from "@/app/components/UsePromisesDemo";

import fs from 'node:fs/promises';
import {Suspense} from "react";
import ErrorBoundary from "@/app/components/ErrorBoundary";


// Só preciso do default aqui se ela for async
export default async function Home() {
    const data = await fs.readFile('dummy-db.json', 'utf-8');
    const users = JSON.parse(data);


    const users1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            // Ver o Suspense (mais detalhes no ServerActionsDemo
            // resolve(users);

            // Aqui chamada o ErrorBoundary quando eu tenho um throw new Error
            reject(new Error("Failed to read database"));
        }, 5000);
    });

    return (
        <ErrorBoundary>
            <Suspense fallback={<p>Loading...</p>}>
                <main>
                    <RSCDemo/>
                    <ClientDemo/>
                    <DataFetchingDemo/>
                    <ServerActionsDemo/>
                    <UsePromiseDemo usersPromise={users1}/>
                </main>
            </Suspense>
        </ErrorBoundary>
    );
}
