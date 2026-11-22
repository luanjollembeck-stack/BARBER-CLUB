# barbearia-bonde-dos-carecas
barbearia sendo feita para matério de prog no senai

banco de dados

CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
-- =====================================================
-- BARBEARIA BARBER CLUB
-- PostgreSQL + UUID
-- =====================================================

CREATE TABLE clientes (
    id_cliente UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(150) NOT NULL,
    telefone VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(150),
    data_nascimento DATE,
    observacoes TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ativo BOOLEAN DEFAULT TRUE
);

-- =====================================================
-- 2. FUNCIONARIOS
-- =====================================================

CREATE TABLE funcionarios (
    id_funcionario UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(150) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(150) UNIQUE,
    cargo VARCHAR(50) NOT NULL,
    especialidade TEXT,
    salario NUMERIC(10,2),
    data_contratacao DATE,
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 3. USUARIOS / ACESSO AO SISTEMA
-- =====================================================

CREATE TABLE usuarios (
    id_usuario UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_cliente UUID UNIQUE REFERENCES clientes(id_cliente),
    id_funcionario UUID UNIQUE REFERENCES funcionarios(id_funcionario),
    email VARCHAR(150) UNIQUE NOT NULL,
    senha_hash TEXT NOT NULL,
    nivel_acesso VARCHAR(30) NOT NULL
        CHECK (nivel_acesso IN (
            'administrador',
            'recepcao',
            'barbeiro',
            'cliente'
        )),
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 4. SERVICOS / TABELA DE PRECOS
-- =====================================================

CREATE TABLE servicos (
    id_servico UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL
        CHECK (categoria IN (
            'cabelo',
            'barba',
            'pintura',
            'sobrancelha',
            'outro'
        )),
    descricao TEXT,
    preco NUMERIC(10,2) NOT NULL CHECK (preco >= 0),
    duracao_minutos INTEGER NOT NULL CHECK (duracao_minutos > 0),
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 5. HORARIOS DOS FUNCIONARIOS
-- =====================================================

CREATE TABLE horarios_funcionarios (
    id_horario UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_funcionario UUID NOT NULL
        REFERENCES funcionarios(id_funcionario) ON DELETE CASCADE,
    dia_semana INTEGER NOT NULL CHECK (dia_semana BETWEEN 0 AND 6),
    hora_inicio TIME NOT NULL,
    hora_fim TIME NOT NULL,
    intervalo_inicio TIME,
    intervalo_fim TIME,
    ativo BOOLEAN DEFAULT TRUE,

    CHECK (hora_fim > hora_inicio)
);

-- =====================================================
-- 6. REGISTRO DE PRESENCA / PONTO
-- =====================================================

CREATE TABLE presencas (
    id_presenca UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_funcionario UUID NOT NULL
        REFERENCES funcionarios(id_funcionario),
    entrada TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    saida TIMESTAMP,
    observacao TEXT,

    CHECK (saida IS NULL OR saida >= entrada)
);

-- =====================================================
-- 7. AGENDAMENTOS
-- =====================================================

CREATE TABLE agendamentos (
    id_agendamento UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_cliente UUID NOT NULL REFERENCES clientes(id_cliente),
    id_funcionario UUID REFERENCES funcionarios(id_funcionario),
    data_agendamento DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fim TIME NOT NULL,
    status VARCHAR(30) DEFAULT 'pendente'
        CHECK (status IN (
            'pendente',
            'confirmado',
            'em_andamento',
            'concluido',
            'cancelado',
            'faltou'
        )),
    observacoes TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CHECK (hora_fim > hora_inicio)
);

-- =====================================================
-- 8. SERVICOS DO AGENDAMENTO
-- Permite mais de um serviço por agendamento
-- =====================================================

CREATE TABLE agendamento_servicos (
    id_agendamento_servico UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_agendamento UUID NOT NULL
        REFERENCES agendamentos(id_agendamento) ON DELETE CASCADE,
    id_servico UUID NOT NULL REFERENCES servicos(id_servico),
    preco_aplicado NUMERIC(10,2) NOT NULL CHECK (preco_aplicado >= 0),
    duracao_aplicada INTEGER NOT NULL CHECK (duracao_aplicada > 0)
);

-- =====================================================
-- 9. AVALIACOES
-- =====================================================

CREATE TABLE avaliacoes (
    id_avaliacao UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_agendamento UUID UNIQUE NOT NULL
        REFERENCES agendamentos(id_agendamento),
    id_cliente UUID NOT NULL REFERENCES clientes(id_cliente),
    id_funcionario UUID REFERENCES funcionarios(id_funcionario),

    nota_barbeiro INTEGER CHECK (nota_barbeiro BETWEEN 1 AND 5),
    comentario_barbeiro TEXT,

    nota_estabelecimento INTEGER CHECK (nota_estabelecimento BETWEEN 1 AND 5),
    comentario_estabelecimento TEXT,

    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 10. PRODUTOS
-- =====================================================

CREATE TABLE produtos (
    id_produto UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(150) NOT NULL,
    descricao TEXT,
    categoria VARCHAR(100),
    tipo VARCHAR(30) DEFAULT 'venda'
        CHECK (tipo IN ('venda', 'consumivel', 'ambos')),
    preco_venda NUMERIC(10,2) NOT NULL CHECK (preco_venda >= 0),
    custo NUMERIC(10,2) DEFAULT 0 CHECK (custo >= 0),
    estoque INTEGER NOT NULL DEFAULT 0 CHECK (estoque >= 0),
    estoque_minimo INTEGER DEFAULT 0,
    unidade VARCHAR(30) DEFAULT 'unidade',
    imagem_url TEXT,
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 11. VENDAS
-- =====================================================

CREATE TABLE vendas (
    id_venda UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_cliente UUID REFERENCES clientes(id_cliente),
    id_funcionario UUID REFERENCES funcionarios(id_funcionario),
    id_agendamento UUID REFERENCES agendamentos(id_agendamento),
    data_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valor_total NUMERIC(10,2) NOT NULL DEFAULT 0,
    desconto NUMERIC(10,2) DEFAULT 0,
    status VARCHAR(30) DEFAULT 'concluida'
        CHECK (status IN (
            'pendente',
            'concluida',
            'cancelada'
        )),
    observacoes TEXT
);

-- =====================================================
-- 12. ITENS DA VENDA
-- =====================================================

CREATE TABLE itens_venda (
    id_item_venda UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_venda UUID NOT NULL REFERENCES vendas(id_venda),
    id_produto UUID REFERENCES produtos(id_produto),
    id_servico UUID REFERENCES servicos(id_servico),
    quantidade INTEGER NOT NULL CHECK (quantidade > 0),
    preco_unitario NUMERIC(10,2) NOT NULL,
    subtotal NUMERIC(10,2) NOT NULL,

    CHECK (
        (id_produto IS NOT NULL AND id_servico IS NULL)
        OR
        (id_produto IS NULL AND id_servico IS NOT NULL)
    )
);

-- =====================================================
-- 13. MOVIMENTACAO DE ESTOQUE
-- =====================================================

CREATE TABLE movimentacoes_estoque (
    id_movimentacao UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_produto UUID NOT NULL REFERENCES produtos(id_produto),
    id_funcionario UUID REFERENCES funcionarios(id_funcionario),
    id_venda UUID REFERENCES vendas(id_venda),
    tipo VARCHAR(30) NOT NULL
        CHECK (tipo IN (
            'entrada',
            'saida_venda',
            'consumo',
            'perda',
            'ajuste',
            'reserva',
            'cancelamento_reserva'
        )),
    quantidade INTEGER NOT NULL CHECK (quantidade > 0),
    data_movimentacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    motivo TEXT
);

-- =====================================================
-- 14. RESERVA DE PRODUTOS
-- =====================================================

CREATE TABLE reservas_produtos (
    id_reserva UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_cliente UUID NOT NULL REFERENCES clientes(id_cliente),
    id_produto UUID NOT NULL REFERENCES produtos(id_produto),
    id_agendamento UUID REFERENCES agendamentos(id_agendamento),
    quantidade INTEGER NOT NULL CHECK (quantidade > 0),
    data_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_expiracao TIMESTAMP,
    status VARCHAR(30) DEFAULT 'reservado'
        CHECK (status IN (
            'reservado',
            'vendido',
            'cancelado',
            'expirado'
        ))
);

-- =====================================================
-- 15. FORMAS DE PAGAMENTO
-- =====================================================

CREATE TABLE formas_pagamento (
    id_forma_pagamento UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(50) NOT NULL UNIQUE,
    ativo BOOLEAN DEFAULT TRUE
);

-- =====================================================
-- 16. PAGAMENTOS
-- =====================================================

CREATE TABLE pagamentos (
    id_pagamento UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_venda UUID NOT NULL REFERENCES vendas(id_venda),
    id_forma_pagamento UUID NOT NULL
        REFERENCES formas_pagamento(id_forma_pagamento),
    valor NUMERIC(10,2) NOT NULL CHECK (valor > 0),
    data_pagamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(30) DEFAULT 'confirmado'
        CHECK (status IN (
            'pendente',
            'confirmado',
            'estornado'
        )),
    observacao TEXT
);

-- =====================================================
-- 17. CATEGORIAS FINANCEIRAS
-- =====================================================

CREATE TABLE categorias_financeiras (
    id_categoria UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(20) NOT NULL
        CHECK (tipo IN ('entrada', 'saida')),
    descricao TEXT,
    ativo BOOLEAN DEFAULT TRUE
);

-- =====================================================
-- 18. MOVIMENTACOES FINANCEIRAS
-- =====================================================

CREATE TABLE movimentacoes_financeiras (
    id_movimentacao_financeira UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_categoria UUID REFERENCES categorias_financeiras(id_categoria),
    id_funcionario UUID REFERENCES funcionarios(id_funcionario),
    id_pagamento UUID REFERENCES pagamentos(id_pagamento),
    descricao TEXT NOT NULL,
    tipo VARCHAR(20) NOT NULL
        CHECK (tipo IN ('entrada', 'saida')),
    valor NUMERIC(10,2) NOT NULL CHECK (valor > 0),
    data_movimentacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    forma_pagamento VARCHAR(50),
    comprovante_url TEXT,
    observacoes TEXT
);

-- =====================================================
-- 19. TRANSFERENCIAS
-- =====================================================

CREATE TABLE transferencias (
    id_transferencia UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    banco_origem VARCHAR(100) NOT NULL,
    banco_destino VARCHAR(100) NOT NULL,
    valor NUMERIC(10,2) NOT NULL CHECK (valor > 0),
    data_transferencia TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    descricao TEXT,
    comprovante_url TEXT
);

-- =====================================================
-- 20. PLANOS
-- =====================================================

CREATE TABLE planos (
    id_plano UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL,
    periodo VARCHAR(20) NOT NULL
        CHECK (periodo IN ('mensal', 'trimestral', 'anual')),
    preco NUMERIC(10,2) NOT NULL CHECK (preco >= 0),
    descricao TEXT,
    quantidade_servicos INTEGER,
    desconto_produtos NUMERIC(5,2) DEFAULT 0,
    beneficios TEXT,
    ativo BOOLEAN DEFAULT TRUE
);

-- =====================================================
-- 21. ASSINATURAS
-- =====================================================

CREATE TABLE assinaturas (
    id_assinatura UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_cliente UUID NOT NULL REFERENCES clientes(id_cliente),
    id_plano UUID NOT NULL REFERENCES planos(id_plano),
    data_inicio DATE NOT NULL,
    data_fim DATE,
    status VARCHAR(30) DEFAULT 'ativa'
        CHECK (status IN (
            'ativa',
            'pendente',
            'cancelada',
            'expirada'
        )),
    renovacao_automatica BOOLEAN DEFAULT FALSE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 22. MARKETING / GALERIA
-- =====================================================

CREATE TABLE marketing (
    id_marketing UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_funcionario UUID REFERENCES funcionarios(id_funcionario),
    id_produto UUID REFERENCES produtos(id_produto),
    titulo VARCHAR(150),
    descricao TEXT,
    tipo VARCHAR(30) NOT NULL
        CHECK (tipo IN (
            'barbearia',
            'profissional',
            'produto',
            'trabalho',
            'promocao'
        )),
    imagem_url TEXT,
    video_url TEXT,
    destaque BOOLEAN DEFAULT FALSE,
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 23. COMODIDADES
-- =====================================================

CREATE TABLE comodidades (
    id_comodidade UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT,
    disponivel BOOLEAN DEFAULT TRUE,
    imagem_url TEXT
);

-- =====================================================
-- 24. ESTABELECIMENTO / LOCALIZACAO
-- =====================================================

CREATE TABLE estabelecimento (
    id_estabelecimento UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(150) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(150),
    endereco VARCHAR(250),
    numero VARCHAR(20),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    estado VARCHAR(100),
    cep VARCHAR(15),
    latitude NUMERIC(10,7),
    longitude NUMERIC(10,7),
    google_maps_url TEXT,
    waze_url TEXT,
    horario_funcionamento TEXT,
    descricao TEXT
);

-- =====================================================
-- 25. FORMAS DE PAGAMENTO INICIAIS
-- =====================================================

INSERT INTO formas_pagamento (nome) VALUES
('Dinheiro'),
('Pix'),
('Cartão de débito'),
('Cartão de crédito'),
('Transferência bancária');

-- =====================================================
-- 26. COMODIDADES INICIAIS
-- =====================================================

INSERT INTO comodidades (nome, descricao, disponivel) VALUES
('Acessibilidade', 'Acesso para pessoas com mobilidade reduzida', TRUE),
('Corte infantil', 'Atendimento para crianças', TRUE),
('Estacionamento', 'Estacionamento para clientes', FALSE),
('Wi-Fi', 'Internet disponível para clientes', TRUE);

-- =====================================================
-- 27. SERVICOS INICIAIS
-- =====================================================

INSERT INTO servicos (nome, categoria, descricao, preco, duracao_minutos) VALUES
('Corte de cabelo', 'cabelo', 'Corte tradicional ou degradê', 45.00, 40),
('Barba', 'barba', 'Aparar e modelar a barba', 30.00, 30),
('Cabelo e barba', 'cabelo', 'Combo de corte e barba', 65.00, 60),
('Pintura', 'pintura', 'Coloração capilar', 80.00, 60),
('Sobrancelha', 'sobrancelha', 'Design de sobrancelha', 15.00, 15);

-- =====================================================
-- 28. PLANOS INICIAIS
-- =====================================================

INSERT INTO planos (nome, periodo, preco, descricao, quantidade_servicos, desconto_produtos, beneficios) VALUES
('Plano Mensal', 'mensal', 79.90, 'Plano mensal de cuidados', 2, 10, 'Prioridade no agendamento'),
('Plano Trimestral', 'trimestral', 219.90, 'Plano de três meses', 6, 15, 'Prioridade e sobrancelha grátis'),
('Plano Anual', 'anual', 799.90, 'Plano anual de cuidados', 24, 20, 'Prioridade e benefícios exclusivos');

-- =====================================================
-- FIM DO SCRIPT
-- =====================================================
