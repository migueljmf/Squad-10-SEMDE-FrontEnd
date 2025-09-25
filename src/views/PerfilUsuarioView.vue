<template>
  <section class="profile-page">
    <div class="profile-card">
      <div class="avatar-wrapper">
        <img :src="profile.photo" alt="Foto do usuario" class="avatar" width="150" height="150" />
      </div>

      <div class="identity">
        <h1 class="identity-name">{{ profile.name }}</h1>
        <p class="identity-role">{{ profile.role }}</p>
        <p class="identity-email">{{ profile.email }}</p>
      </div>

      <div class="details">
        <div class="detail-item">
          <span class="detail-label">Endereco</span>
          <span class="detail-value">{{ profile.address }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Data de nascimento</span>
          <span class="detail-value">{{ profile.birthday }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Telefone</span>
          <span class="detail-value">{{ profile.phone }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Cargo</span>
          <span class="detail-value">{{ profile.position }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const profile = {
  name: "Mariana Costa",
  role: "Coordenadora de Projetos",
  email: "mariana.costa@exemplo.com",
  address: "Av. Central, 123 - Centro, Cidade/UF",
  birthday: "12 de marco de 1988",
  phone: "(11) 99876-5432",
  position: "Coordenadora Municipal",
  photo:
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'><defs><linearGradient id='grad' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%231565c0'/><stop offset='100%' stop-color='%235998df'/></linearGradient></defs><circle cx='80' cy='80' r='80' fill='url(%23grad)'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' font-family='Poppins, Arial, sans-serif' font-size='56' fill='white'>MC</text><text x='50%' y='72%' dominant-baseline='middle' text-anchor='middle' font-family='Poppins, Arial, sans-serif' font-size='18' fill='rgba(255,255,255,0.8)'>Perfil</text></svg>",
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");

.profile-page {
  min-height: calc(100vh - 96px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(110px, 16vh, 160px) 16px 72px;
  background: linear-gradient(135deg, #f0f4ff 0%, #f8fbff 100%);
  box-sizing: border-box;
}

.profile-card {
  width: min(560px, 100%);
  background: #ffffff;
  border-radius: 28px;
  box-shadow: 0 24px 48px rgba(21, 101, 192, 0.18);
  padding: 56px 48px 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
  text-align: center;
  font-family: "Poppins", sans-serif;
}

.avatar-wrapper {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(21, 101, 192, 0.2), rgba(89, 152, 223, 0.2));
  padding: 12px;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 6px solid #ffffff;
  box-shadow: 0 12px 24px rgba(15, 35, 75, 0.18);
  object-fit: cover;
}

.identity {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #333333;
}

.identity-name {
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  color: #111111;
}

.identity-role {
  margin: 0;
  font-size: 17px;
  color: #777777;
  font-weight: 500;
}

.identity-email {
  margin: 0;
  font-size: 16px;
  color: #444444;
  font-weight: 400;
}

.details {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 22px;
  align-items: center;
}

.detail-item {
  width: min(420px, 100%);
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: center;
}

.detail-label {
  font-size: 15px;
  font-weight: 600;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  font-size: 17px;
  font-weight: 500;
  color: #444444;
}

@media (max-width: 600px) {
  .profile-page {
    padding: 120px 20px 64px;
  }

  .profile-card {
    padding: 48px 28px 40px;
    gap: 32px;
    border-radius: 24px;
  }

  .avatar-wrapper {
    width: 160px;
    height: 160px;
    padding: 10px;
  }

  .avatar {
    width: 140px;
    height: 140px;
  }

  .identity-name {
    font-size: 25px;
  }
}

@media (max-width: 420px) {
  .profile-page {
    padding: 110px 16px 56px;
  }

  .profile-card {
    padding: 40px 20px 32px;
    gap: 28px;
  }

  .identity-name {
    font-size: 23px;
  }

  .detail-label {
    font-size: 14px;
  }

  .detail-value {
    font-size: 16px;
  }
}
</style>
