import styles from './Lembrete.module.css';
import { useState } from 'react';

function Lembrete() {
  const [lembrete, setLembrete] = useState('');
  const [date, setDate] = useState('');
  const [lembretes, setLembretes] = useState([]);

  function enviarLembreteData(e) {
    e.preventDefault();

    // Validação dos campos
    if (!lembrete || !date || new Date(date) <= new Date()) {
      alert('Preencha o Nome e uma Data futura válida.');
      return;
    }

    // Cria um objeto com o lembrete
    const novoLembrete = {
      nome: lembrete,
      data: date,
    };

    // Verifica se já existe um dia com essa data na lista
    const dataExiste = lembretes.find((item) => item.data === date);

    if (dataExiste) {
      // Se a data já existe, adiciona o lembrete à lista do dia correspondente
      dataExiste.lembretes.push(novoLembrete);
    } else {
      // Se a data não existe, cria um novo dia e adiciona o lembrete
      const novoDia = {
        data: date,
        lembretes: [novoLembrete],
      };
      // Adiciona o novo dia à lista de lembretes
      setLembretes((prevLembretes) => [...prevLembretes, novoDia]);
    }

    // Ordena as datas em ordem cronológica
    setLembretes((prevLembretes) =>
      prevLembretes.sort((a, b) => new Date(a.data) - new Date(b.data))
    );

    // Limpa os campos
    setLembrete('');
    setDate('');
  }

  function limparLembrete(data, nome) {
    // Remove o lembrete do dia correspondente
    setLembretes((prevLembretes) =>
      prevLembretes.map((dia) => {
        if (dia.data === data) {
          dia.lembretes = dia.lembretes.filter((lembrete) => lembrete.nome !== nome);
        }
        return dia;
      })
    );

    // Remove os dias vazios da lista
    setLembretes((prevLembretes) => prevLembretes.filter((dia) => dia.lembretes.length > 0));
  }

  return (
    //cria e estiliza o formulário ja diretono css lembrete.module
    <div className={styles.formulario}>
      <form>
        <div className={styles.container}>
          <div className={styles.titulo}>
            <h1>Novo Lembrete</h1>
          </div>
          <div className={styles.nome}>
            <div className={styles.lab}>
              <label className={styles.label}>Nome:</label>
            </div>
            <div className={styles.in}>
              <input
                type="text"
                id="lembrete"
                name="lembrete"
                placeholder="Nome do Lembrete"
                value={lembrete}
                onChange={(e) => setLembrete(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.dado}>
            <div className={styles.lab}>
              <label className={styles.label}>Data:</label>
            </div>
            <div className={styles.in}>
              <input
                type="date"
                id="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
          <button className={styles.butao} onClick={enviarLembreteData}>
            Criar
          </button>
        </div>
        <div>
          <h3>Lista de Lembretes:</h3>
          </div>
          {lembretes.map((dia) => (
          <div key={dia.data}>
            <h4>{dia.data}</h4>
            {dia.lembretes.map((lembrete) => (
              <div key={lembrete.nome}>
                <p>
                  Lembrete: {lembrete.nome}
                  <button
                    className={styles.but}
                    onClick={() => limparLembrete(dia.data, lembrete.nome)}
                  >
                    x
                  </button>
                </p>
              </div>
            ))}
          </div>
        ))}
        
      </form>
    </div>
  )
}

export default Lembrete;
