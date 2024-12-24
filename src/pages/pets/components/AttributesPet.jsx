const AttributesPet = ({ happiness, energi, hunger }) => {
    return (
        <div>
            <h3>Atributos</h3>
            <div>
                <div>
                    <span>Felicidad</span>
                    <progress value="3" max="100"></progress>
                </div>
                <div>
                    <span>Energía</span>
                    <progress value={energi} max="100"></progress>
                </div>
                <div>
                    <span>Hambre</span>
                    <progress value={hunger} max="100"></progress>
                </div>
            </div>
        </div>
    );
}

export default AttributesPet;
