import mongoose from 'mongoose';

// A MongoDB replica set is a group of mongod instances 
// that maintain the same data set, providing high availability, redundancy, 
// and automatic failover. It consists of one primary node that receives 
// all write operations and multiple secondary nodes that replicate data asynchronously. 
// If the primary fails, a secondary is automatically elected to become the new primary.
// More info: https://www.mongodb.com/es/docs/manual/replication/

const initializeMongo = () => {
    const MONGO_URI = process.env.MONGO_URI || ''

    mongoose.connect(MONGO_URI)
        .then(() => console.log('🚀 Connected to Mongo...'))
        .catch(error => {
            console.log(`Error connecting Mongo: ${error}`)
            process.exit(1)
        })
}

export default initializeMongo