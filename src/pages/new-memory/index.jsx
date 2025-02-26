import { useState } from "react";
import Header from "../../components/header";
import memory from "../../services/memory";

const NewMemory = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [userFeedback,setUserFeedBack] = useState ("");
    const [images, setImages] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);

    const onSetImage = (event) => {

        console.log("CHEGOU ATÉ AQUI.");

        // Ao selecionar uma image, execute aqui...
        const files = event.target.files; // Pega os arquivos inseridos.
        setImages(files);

        // Gerar as thumbnails das imagens para mostrar na tela.
        for (let contador = 0; contador < files.length; contador++) {

            const file = files[contador];

            const thumbnail = URL.createObjectURL(file); // Criar a thumbnail.

            imageURLs.push(thumbnail); // Acrescenta na lista.

        }


    }

    // Função assíncrona para criar uma nova memória
    const onCreateMemory = async () => {
        let payload = {
            title: title, // Título da memória
            description: description, // Descrição da memória
            images: images, // Lista de imagens
            date: new Date().toISOString() // Data da criação no formato ISO
        };

        let response = await memory.createMemory(payload); // Envia os dados para o serviço

        if (response) { // Se a resposta for bem-sucedida
            setUserFeedBack("Memória criada com sucesso!"); // Exibe um feedback positivo

            setTimeout(() => {
                setUserFeedBack(""); // Limpa o feedback após 5 segundos
            }, 5000);

            // Reseta os campos do formulário
            setTitle("");
            setDescription("");
            setImages([]);
            setImageURLs([]);
        }
    }

    return (
        <>

            <Header />

            <main className="app-main">
                <h1>Criar memória</h1>

                <p className="feedback">{userFeedback}</p>

                <div className="form-container">
                    <label>
                        <span>Título</span>
                        <input onChange={event => setTitle(event.target.value)} value={title} type="text" placeholder="Insira o título aqui." />
                    </label>

                    <label>
                        <span>Descrição</span>
                        <textarea onChange={event => setDescription(event.target.value)} value={description} placeholder="Insira a descrição aqui."></textarea>
                    </label>

                    <label htmlFor="file-input" className="file">
                        <span>Imagens</span>
                        <span className="input-file-button">Adicionar imagem</span>
                        <input onChange={event => onSetImage(event)} id="file-input" type="file" multiple />
                        <span className="no-images">Nenhuma imagem no momento.</span>
                        <div className="images-container">

                            {imageURLs.map((imageURL, index) => (
                                <div key={index} className="image" style={{ backgroudImage: `url(${imageURL})` }}> </div>
                            ))}
                        </div>
                    </label>
                </div>

                <button onClick={() => onCreateMemory()} className="create-memory-btn">Criar memória</button>
            </main>

            <footer className="app-footer">
                <p>Mnemosyne - Kaue Godencio</p>
            </footer>

        </>
    );

};

export default NewMemory;