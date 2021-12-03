import uploadImage from '@/modules/daybook/helpers/uploadImage'
import axios from 'axios'

describe('Prueba en el uploadImage', () => {

    test('debe de cargar un archivo y retornar el url', async() => {

        const {data} = await axios.get('https://res.cloudinary.com/evelynsl/image/upload/v1636985061/burp7wc8mg0nnxqdp6hj.jpg', {
            responseType: 'arraybuffer'
        }) 

        const file = new File([data], 'foto.jpg')

        const url = await uploadImage (file)

        expect(typeof url).toBe('string')
    })


})