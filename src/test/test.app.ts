import mongoose from "mongoose";


export default function beforeAndAfterHooks() {

    /**
     * A test setup step that opens a database connection before running tests
    */
    beforeAll(async () => {
        try {

            const dbName = await getDbName()

            await mongoose.connect(dbName);

            /**
             * Listens for the "disconnect" event and logs a message when the MongoDB connection is disconnected.
             */
            mongoose.connection.on("disconnect", () => {
                console.log("MongoDB disconnected successfully");
            });

            /**
             * Handles the SIGINT signal (e.g., when the user presses Ctrl+C).
             */
            process.on("SIGINT", async () => {
                /**
                 * Closes the MongoDB connection gracefully.
                 */
                await mongoose.connection.close();

                /** print database closed notice */
                console.log("MongoDB connection closed successfully");

                /**
                 * Exit the process with a status code of 0 to indicate a successful termination.
                 */
                process.exit(0);
            });

        } catch (err) {
            /**
             * Throws an error if there is an error during the database connection process.
             */
            throw err;
        }
    })

    /**
     * A test teardown step that closes the database connection after running tests
     */
    afterAll(async () => {

        /** 
         * Get a list of all collections in the database 
         */
        const collections = await mongoose.connection.db.listCollections().toArray();

        /** 
         * Iterate through each collection 
         */
        for (const collection of collections) {
            /**
             * Get collection name
             */
            const collectionName = collection.name;

            /**
             * Get a reference to the collection
             */
            const dbCollection = mongoose.connection.db.collection(collectionName);

            /**
             *  Remove all documents from the collection 
             */
            await dbCollection.deleteMany({});
        }

    })

}

async function getDbName(): Promise<string> {

    /**
     * get database name from configService and return it
     */
    return process.env.DATABASE_URI

} 