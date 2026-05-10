import supabase from "./supabaseStorage.js";

export async function uploadImagem(arquivo, pasta = "posts") {
  const nomeArquivo = `${Date.now()}-${arquivo.originalname}`;

  const caminho = `${pasta}/${nomeArquivo}`;

  const { error } = await supabase.storage
    .from(process.env.SUPABASE_BUCKET)
    .upload(caminho, arquivo.buffer, {
      contentType: arquivo.mimetype,
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage
    .from(process.env.SUPABASE_BUCKET)
    .getPublicUrl(caminho);

  return data.publicUrl;
}
