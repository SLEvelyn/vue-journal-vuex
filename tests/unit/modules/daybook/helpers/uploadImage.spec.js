import cloudinary from 'cloudinary'
import uploadImage from '@/modules/daybook/helpers/uploadImage'
import axios from 'axios'



cloudinary.config({
    cloud_name: 'evelynsl',
    api_key: '887451317651727',
    api_secret: 'Bx9P64AJlp3Nn-0WB49uvdxo-tU'
})


describe('Prueba en el uploadImage', () => {

    test('debe de cargar un archivo y retornar el url', async(done) => {

        const {data} = await axios.get('https://res.cloudinary.com/evelynsl/image/upload/v1636725878/st8qqjnsbcwt7dm9nyrz.jpg', {
            responseType: 'arraybuffer'
        }) 

        const file = new File([data], 'foto.jpg')

        const url = await uploadImage (file)

        expect(typeof url).toBe('string')

        //Tomar el ID
        const segments = url.split('/')
        const imageId = segments[segments.length -1].replace('.jpg', '')
        cloudinary.v2.api.delete_resources(imageId, {}, () => {
            done()
        })
    })


})