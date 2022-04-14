import { createContext,useState,useEffect } from "react";
import {collection,addDoc,getDocs, doc,onSnapshot,deleteDoc,updateDoc} from 'firebase/firestore'
import * as firebaseApp from '../firebase/configFirebase'
import {ref,uploadBytesResumable,getDownloadURL,deleteObject} from 'firebase/storage'
export const  FirestoreContext = createContext();

const refCollection = collection(firebaseApp.firestore,'products')
const refCollectionOrders = collection(firebaseApp.firestore,'orders')

const FirestoreProvider = ({children}) =>{
    const [allProducts,setAllProducts] = useState([])
    const [allOrders,setAllOrders] = useState([])

    // this function create my product 
    const addProduct = async(newProduct,image)=>{
        const refHosting = ref(firebaseApp.storage,`images/${image.name}`)
        const uploadImage = uploadBytesResumable(refHosting,image);
        uploadImage.on(
            'state_change',(snapshot)=>{
                const proggress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log(`you have upload the ${proggress} %`)
            },(err)=>{console.log(err.message)},()=>getDownloadURL(uploadImage.snapshot.ref).then((url)=> addDoc(refCollection,{...newProduct,img:url}))
        )
    }

    // save or create a new order 
    const saveOrder = async(ourcard,userData) =>{
        addDoc(refCollectionOrders,{...ourcard,...userData})
    }

    //  this function get the data from firestore and save it in my state
    const getAllProducts = async () =>{
        const productsFromFirestore = await getDocs(refCollection)
        console.log(productsFromFirestore)
        setAllProducts(productsFromFirestore.docs.map((product)=>({
            data:product.data(),
            id:product.id
        })))
    }

    // this function will get all the orders 
    const getAllOrders = async () =>{
        const ordersFromFirestore = await getDocs(refCollectionOrders)
        setAllOrders(ordersFromFirestore.docs.map(order=>({data:order.data(),id:order.id})))
    }

    useEffect(()=>{
        getAllProducts()
    },[])
    // this is an observer that check if there is new data on my database that is locaded on firestore

   
    
    //TODOS modify Products
    const modifyProduct = async(newData) =>{
        console.log(newData)
        //check if new image exist

        //  if new image exist 
        //   --- find image url image and delete it
        //    ------ upload our new image
        //      --- get the new url from the new image
        //         ----update my file .

        const refToTheDocumnet =  doc(firebaseApp.firestore,'products',newData.id)
        const dataClean = {...newData}
        delete dataClean.id
        updateDoc(refToTheDocumnet,{...dataClean})
    }

    //DELETE produc
    const deleteProduct = async (id,imageToDelete) =>{
        //console.log(`i will delete the product with the id === ${id}`)
        await deleteDoc(doc(firebaseApp.firestore,'products',id))
        deleteImage(imageToDelete)


    }

    const deleteImage = (imageName) =>{
        const refToImage = ref(firebaseApp.storage,`images/${imageName}`)
        deleteObject(refToImage).then(()=>{console.log("the image was delete")}).catch((err)=> console.log(err.message))
    }

    const data = {
        allProducts:allProducts,
        addProduct:addProduct,
        deleteProduct:deleteProduct,
        modifyProduct:modifyProduct,
        saveOrder:saveOrder,
        getAllOrders:getAllOrders,
        allOrders:allOrders
    }

    return(
        <FirestoreContext.Provider value={data}>
            {children}
        </FirestoreContext.Provider>
    )
}
export default FirestoreProvider
