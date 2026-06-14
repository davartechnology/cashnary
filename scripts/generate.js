#!/usr/bin/env node

/**
 * Script de génération automatique d'articles de blog
 * Utilise DeepSeek pour ia-tech et Gemini pour business-en-ligne
 */

import { readFileSync, writeFileSync, mkdirSync, appendFileSync, existsSync, readdirSync, statSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { GoogleGenerativeAI } from '@google/generative-ai'
import Groq from 'groq-sdk'
import { TwitterApi } from 'twitter-api-v2'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')

// Lecture manuelle du .env.local
function loadEnv() {
  try {
    const envPath = join(rootDir, '.env.local')
    const content = readFileSync(envPath, 'utf-8')
    console.log("CONTENU BRUT:", content)
    content.split('\n').forEach(line => {
      line = line.trim()
      if (line && !line.startsWith('#')) {
        const [key, ...rest] = line.split('=')
        const value = rest.join('=').trim()
        process.env[key.trim()] = value
      }
    })
  } catch(e) {
    console.error("Erreur lecture .env.local:", e.message)
  }
  
  // Les variables GitHub Actions sont déjà dans process.env
  // On ne les écrase pas si elles existent déjà
  const envVars = ['GROQ_API_KEY', 'GEMINI_API_KEY', 'DEEPSEEK_API_KEY']
  envVars.forEach(key => {
    if (process.env[key]) {
      console.log(`✅ ${key} chargée depuis l'environnement système`)
    }
  })
}

loadEnv()

// Post to Twitter/X after article generation
async function postToTwitter(title, slug, theme) {
  try {
    console.log("TWITTER_API_KEY:", process.env.TWITTER_API_KEY ? 
      process.env.TWITTER_API_KEY.substring(0,8) + "..." : "NON CHARGÉE")
    console.log("TWITTER_API_SECRET:", process.env.TWITTER_API_SECRET ? 
      process.env.TWITTER_API_SECRET.substring(0,8) + "..." : "NON CHARGÉE")
    console.log("TWITTER_ACCESS_TOKEN:", process.env.TWITTER_ACCESS_TOKEN ? 
      process.env.TWITTER_ACCESS_TOKEN.substring(0,8) + "..." : "NON CHARGÉE")
    console.log("TWITTER_ACCESS_TOKEN_SECRET:", process.env.TWITTER_ACCESS_TOKEN_SECRET ? 
      process.env.TWITTER_ACCESS_TOKEN_SECRET.substring(0,8) + "..." : "NON CHARGÉE")
    
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    })

    const emoji = theme === 'ia-tech' ? '🤖' : '💰'
    const hashtags = theme === 'ia-tech' 
      ? '#IA #Intelligence #Technologie #Business' 
      : '#Business #ArgentEnLigne #Freelance #Entrepreneur'
    
    const blogUrl = 'https://cashnary.vercel.app'
    const articleUrl = `${blogUrl}/blog/${slug}`
    
    const tweet = `${emoji} ${title}\n\n${hashtags}\n\n👉 ${articleUrl}`
    
    await client.v2.tweet(tweet)
    log(`🐦 Tweet publié : ${title}`)
  } catch(e) {
    log(`⚠️ Twitter échoué: ${e.message}`)
  }
}

console.log("GROQ:", process.env.GROQ_API_KEY ? process.env.GROQ_API_KEY.substring(0,8) + "..." : "NON CHARGÉE")
console.log("DEEPSEEK:", process.env.DEEPSEEK_API_KEY ? process.env.DEEPSEEK_API_KEY.substring(0,8) + "..." : "NON CHARGÉE")
console.log("GEMINI:", process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.substring(0,8) + "..." : "NON CHARGÉE")

// Configuration
const CONFIG = {
  contentDir: join(rootDir, 'content'),
  logsDir: join(rootDir, 'logs'),
  errorsLog: join(rootDir, 'logs', 'errors.log'),
  themes: {
    'ia-tech': {
      topics: [
        // Plateformes pour gagner de l'argent
        "Comment gagner de l'argent sur Fiverr en 2026 : guide complet débutant",
        "TikTok Creator Fund : comment monétiser ta chaîne TikTok étape par étape",
        "Pinterest : comment gagner de l'argent avec des épingles affiliées",
        "Instagram : 7 méthodes concrètes pour monétiser ton compte en 2026",
        "Facebook : comment vendre tes services et produits sur Marketplace",
        "YouTube : créer une chaîne automatisée avec l'IA et gagner de l'argent",
        "Upwork vs Fiverr : quelle plateforme choisir pour débuter en freelance",
        "Comment gagner de l'argent sur Etsy avec des produits digitaux",
        "Twitch : comment monétiser tes streams même avec peu d'abonnés",
        "LinkedIn : vendre tes services B2B et trouver des clients premium",
        
        // IA & Automatisation
        "Créer un blog automatisé avec l'IA et gagner de l'argent en dormant",
        "ChatGPT : 10 idées de niches pour créer du contenu viral et rentable",
        "Comment créer une chaîne YouTube automatique avec l'IA sans montrer son visage",
        "Vendre des prompts ChatGPT sur PromptBase : guide complet 2026",
        "Créer et vendre des formations en ligne avec l'IA en moins de 7 jours",
        "Comment utiliser Midjourney pour vendre des illustrations sur Etsy",
        "Automatiser une newsletter rentable avec l'IA et gagner 500$/mois",
        "Créer des ebooks avec ChatGPT et les vendre sur Amazon KDP",
        
        // Crypto & Stablecoins
        "Gagner de l'argent avec les faucets crypto : guide complet FaucetPay",
        "Stablecoins : comment gagner des intérêts passifs avec USDT et USDC",
        "Comment gagner des cryptos gratuitement sans investissement en 2026",
        "FaucetPay : comment maximiser tes gains avec les micro-tâches crypto",
        "Créer son propre faucet crypto et gagner de l'argent passivement",
        "Trading de stablecoins : stratégie pour débutants sans risque",
        
        // Musique & Audio
        "Suno.com : créer de la musique avec l'IA et la vendre en ligne",
        "Spotify for Artists : comment gagner de l'argent avec ta musique IA",
        "YouTube Music : monétiser tes créations musicales générées par IA",
        "DistroKid vs TuneCore : quelle plateforme pour distribuer ta musique IA",
        "Créer des jingles et musiques de fond avec l'IA pour les YouTubeurs",
        
        // Apps & Jeux
        "Créer une application mobile simple avec l'IA sans coder en 2026",
        "Bubble.io : créer un SaaS no-code rentable étape par étape",
        "Créer un petit jeu mobile avec l'IA qui génère des revenus publicitaires",
        "Idées d'applications utiles à créer avec l'IA qui rapportent en 2026",
        "Comment monétiser une app gratuite avec des publicités et in-app purchases"
      ]
    },
    'business-en-ligne': {
      topics: [
        // Business & Revenus
        "Comment passer de 0 à 1000$ par mois en ligne en 90 jours",
        "Dropshipping en 2026 : est-ce encore rentable et comment démarrer",
        "Print on demand : créer une boutique Printful sans stock ni investissement",
        "Affiliate marketing : les 5 niches les plus rentables en 2026",
        "Créer un SaaS no-code avec Bubble et le vendre 99$/mois",
        "Comment vendre des templates Notion et gagner de l'argent passif",
        "Vendre des presets Lightroom sur Etsy : guide complet débutant",
        "Créer une agence de services IA et facturer 2000$ par client",
        "Comment écrire et vendre un ebook en 48h avec ChatGPT",
        "Systeme.io : créer un tunnel de vente gratuit et vendre en automatique",
        
        // Freelance
        "Rédaction web avec l'IA : comment facturer 50€ l'article en freelance",
        "Community manager freelance : trouver ses premiers clients en 30 jours",
        "Création de sites web WordPress : facturer 500€ par site sans coder",
        "Gestionnaire de publicités Facebook Ads : se former et trouver des clients",
        "Traduction et sous-titrage avec l'IA : gagner de l'argent depuis chez soi",
        
        // Stratégies avancées
        "Email marketing : construire une liste de 1000 abonnés et monétiser",
        "SEO en 2026 : comment ranker sur Google avec du contenu IA",
        "Créer un podcast avec l'IA et le monétiser avec des sponsors",
        "Newsletter payante : comment facturer 10$/mois à 100 abonnés",
        "Vendre des services sur Malt : créer un profil qui attire les clients"
      ]
    }
  }
};

// Log to console with prefix
function log(message) {
  console.log(message);
}

// Log error to file
function logError(message, error) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}: ${error.message}\n${error.stack}\n\n`;
  
  // Ensure logs directory exists
  if (!existsSync(CONFIG.logsDir)) {
    mkdirSync(CONFIG.logsDir, { recursive: true });
  }
  
  appendFileSync(CONFIG.errorsLog, logMessage);
  console.error(`❌ Erreur: ${message}`);
}

// Generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Get date string for filename
function getDateString() {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

// Generate random topic for theme
function getRandomTopic(theme) {
  const topics = CONFIG.themes[theme].topics;
  return topics[Math.floor(Math.random() * topics.length)];
}

function getRecentTitles() {
  const contentRoot = CONFIG.contentDir;
  if (!existsSync(contentRoot)) return [];

  const entries = [];
  const themes = readdirSync(contentRoot, { withFileTypes: true });
  for (const themeDirent of themes) {
    if (!themeDirent.isDirectory()) continue;
    const themeDir = join(contentRoot, themeDirent.name);
    const files = readdirSync(themeDir);
    for (const file of files) {
      if (!file.toLowerCase().endsWith('.md')) continue;
      const filepath = join(themeDir, file);
      try {
        const stats = statSync(filepath);
        entries.push({ filepath, mtime: stats.mtime.getTime() });
      } catch (e) {
        // ignore invalid files
      }
    }
  }

  const recentFiles = entries.sort((a, b) => b.mtime - a.mtime).slice(0, 10);
  return recentFiles.map(({ filepath }) => {
    try {
      const raw = readFileSync(filepath, 'utf8');
      const frontmatterMatch = raw.match(/^\s*title:\s*["'](.+?)["']\s*$/m);
      if (frontmatterMatch && frontmatterMatch[1]) {
        return frontmatterMatch[1].trim();
      }
      const lines = raw.split('\n').map(line => line.trim()).filter(Boolean);
      for (const line of lines) {
        if (line.startsWith('# ')) {
          return line.substring(2).trim();
        }
      }
      return filepath;
    } catch (e) {
      return filepath;
    }
  });
}

function buildDuplicationPrompt() {
  const titles = getRecentTitles();
  if (!titles.length) return '';
  const list = titles.map(title => `- ${title}`).join('\n');
  return `SUJETS DÉJÀ TRAITÉS RÉCEMMENT (ne pas répéter) :\n${list}\n\n`;
}

// Call Groq API
async function callGrok(prompt) {
  const apiKey = process.env.GROQ_API_KEY;
  
  log(`🔍 Groq API Key: ${apiKey ? apiKey.substring(0, 10) + '...' : 'NOT FOUND'}`);
  
  if (!apiKey) {
    throw new Error('GROQ_API_KEY not found in environment variables');
  }

  const groq = new Groq({ apiKey });
  
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: "Tu es un expert en business en ligne, revenus passifs et \nstratégies digitales. Tu écris pour un blog francophone \nappelé CASHNARY.\n\nRÈGLES STRICTES :\n- PREMIÈRE LIGNE : titre court et accrocheur MAX 80 caractères, \n  en texte brut sans # ni **\n- Minimum 2000 caractères OBLIGATOIRE\n- Utilise ## pour les sous-titres (jamais 'H2:' en texte brut)\n- Donne des étapes CONCRÈTES et ACTIONNABLES avec des chiffres\n- Parle directement au lecteur avec 'tu'\n- Cite des plateformes, outils et exemples RÉELS\n- Donne des fourchettes de revenus réalistes\n- Structure : Introduction → Pourquoi ça marche → \n  Étapes concrètes → Erreurs à éviter → \n  Revenus potentiels → Outils recommandés → Conclusion\n- Ton : mentor bienveillant, direct, motivant et honnête\n- Jamais de contenu vague ou générique\n- Toujours donner des actions précises que le lecteur \n  peut faire AUJOURD'HUI" },
      { role: "user", content: prompt }
    ],
    max_tokens: 4000,
    temperature: 0.7
  });
  
  log(`📡 Groq Status: Success`);
  
  const text = completion.choices[0].message.content;
  
  if (text) {
    return text;
  }
  
  throw new Error('Invalid Groq response: no content');
}

// Call DeepSeek API
async function callDeepSeek(prompt) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  
  log(`🔍 DeepSeek API Key: ${apiKey ? apiKey.substring(0, 10) + '...' : 'NOT FOUND'}`);
  
  if (!apiKey) {
    throw new Error('DEEPSEEK_API_KEY not found in environment variables');
  }

  const response = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { 
          role: 'system', 
          content: 'Tu es un expert rédacteur de blog francophone spécialisé en intelligence artificielle et nouvelles technologies. Rédige un article de blog professionnel en français. Résous un problème EXACT et CONCRET. Entre 600 et 800 mots STRICTEMENT. Utilise OBLIGATOIREMENT ## pour les sous-titres H2 (exemple : ## Titre de section). N\'écris JAMAIS \'H2:\' en texte brut. N\'utilise JAMAIS ** autour du titre principal. Le titre principal doit être sur la première ligne en texte brut sans #. Introduction qui accroche en 2 phrases. 3 à 4 sections avec sous-titres H2. Conclusion avec appel à l\'action. Ton : direct, expert, accessible. Aucun contenu générique ou bateau.' 
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000
    })
  });

  log(`📡 DeepSeek Status: ${response.status} ${response.statusText}`);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`DeepSeek API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  
  if (data.choices && data.choices[0]) {
    return data.choices[0].message.content;
  }
  
  throw new Error('Invalid DeepSeek response: no content');
}

// Call Gemini API
async function callGemini(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  
  log(`🔍 Gemini API Key: ${apiKey ? apiKey.substring(0, 10) + '...' : 'NOT FOUND'}`);
  
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not found in environment variables');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const fullPrompt = `Tu es un expert rédacteur de blog francophone spécialisé en business en ligne et entrepreneuriat digital. Rédige un article de blog professionnel en français. Résous un problème EXACT et CONCRET. Entre 600 et 800 mots STRICTEMENT. Utilise OBLIGATOIREMENT ## pour les sous-titres H2 (exemple : ## Titre de section). N'écris JAMAIS 'H2:' en texte brut. N'utilise JAMAIS ** autour du titre principal. Le titre principal doit être sur la première ligne en texte brut sans #. Introduction qui accroche en 2 phrases. 3 à 4 sections avec sous-titres H2. Conclusion avec appel à l'action. Ton : direct, expert, accessible. Aucun contenu générique ou bateau.\n\nSujet: ${prompt}`;

  log(`📡 Appel Gemini avec le prompt: ${prompt}`);

  const result = await model.generateContent(fullPrompt);
  const response = result.response;
  const text = response.text();

  if (text) {
    return text;
  }
  
  throw new Error('Invalid Gemini response: no content');
}

// Generate article with fallback
async function generateArticle(theme) {
  const topic = getRandomTopic(theme);
  const duplicationPrompt = buildDuplicationPrompt();
  const prompt = `${duplicationPrompt}Rédige un article complet sur le sujet suivant: ${topic}`;
  
  let content = null;
  let usedApi = null;
  let error = null;

  // Priority: Grok -> Gemini -> DeepSeek
  try {
    log(`\n🤖 Génération article ${theme} avec Grok...`);
    content = await callGrok(prompt);
    usedApi = 'Grok';
  } catch (e) {
    log(`⚠️ Grok échoué: ${e.message}`);
    
    // Fallback 1: Gemini
    try {
      log(`🔄 Tentative avec Gemini...`);
      content = await callGemini(prompt);
      usedApi = 'Gemini (fallback)';
    } catch (e2) {
      log(`⚠️ Gemini échoué: ${e2.message}`);
      
      // Fallback 2: DeepSeek
      try {
        log(`🔄 Tentative avec DeepSeek...`);
        content = await callDeepSeek(prompt);
        usedApi = 'DeepSeek (fallback)';
      } catch (e3) {
        log(`⚠️ DeepSeek échoué: ${e3.message}`);
        error = e3;
      }
    }
  }

  if (error) {
    logError(`Échec génération ${theme}`, error);
    throw error;
  }

  return { content, usedApi };
}

function formatArticle(content, theme) {
  // Nettoyer le contenu
  let cleanContent = content
    .replace(/^H2:\s*/gm, '## ')
    .replace(/^\*\*(.*?)\*\*$/gm, '$1')

  const lines = cleanContent.split('\n');
  let title = '';

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('---')) continue;
    if (trimmed.startsWith('# ')) {
      title = trimmed.substring(2).trim().replace(/\*\*/g, '');
      break;
    }
    // Titre = première ligne courte (moins de 100 caractères)
    if (trimmed.length < 100 && !trimmed.startsWith('##')) {
      title = trimmed.replace(/\*\*/g, '');
      break;
    }
  }
  // Si toujours pas de titre court, génère un titre depuis le topic
  if (!title || title.length > 100) {
    title = 'Article CASHNARY ' + getDateString()
  }

  const slug = generateSlug(title).substring(0, 60).replace(/-+$/g, '')
  const date = getDateString();
  const wordCount = cleanContent.split(/\s+/).filter(w => w.length > 0).length;

  const description = cleanContent
    .replace(/^#+.*$/gm, '')
    .replace(/\*\*/g, '')
    .replace(/\n+/g, ' ')
    .trim()
    .substring(0, 150)
    .trim() + '...';
  const tags = theme === 'ia-tech'
    ? ['IA', 'technologie', 'productivité']
    : ['business', 'entrepreneur', 'revenus'];

  const frontmatter = `---
title: "${title.replace(/"/g, "'")}"
date: "${date}"
slug: "${slug}"
description: "${description.replace(/"/g, "'")}"
theme: "${theme}"
tags: ${JSON.stringify(tags)}
wordCount: ${wordCount}
---

${cleanContent}`;

  return {
    filename: `${date}-${slug}.md`,
    frontmatter,
    title,
    wordCount
  };
}

// Save article to file
function saveArticle(theme, content) {
  const themeDir = join(rootDir, 'content', theme);
  
  if (!existsSync(themeDir)) {
    mkdirSync(themeDir, { recursive: true });
  }

  const filepath = join(themeDir, content.filename);
  writeFileSync(filepath, content.frontmatter, 'utf8');
  
  return filepath;
}

// Main function
async function main() {
  log('🚀 Début de la génération des articles\n');
  log('='.repeat(50));

  try {
    // Generate ia-tech article
    console.log('📝 Étape 1: generateArticle...')
    const iaTech = await generateArticle('ia-tech');
    console.log('📝 Étape 2: formatArticle...')
    const iaTechFormatted = formatArticle(iaTech.content, 'ia-tech');
    console.log('📝 Étape 3: saveArticle...')
    console.log('📝 Title:', iaTechFormatted.title)
    console.log('📝 Filename:', iaTechFormatted.filename)
    const iaTechPath = saveArticle('ia-tech', iaTechFormatted);
    console.log('📝 Étape 4: sauvegarde OK')
    await postToTwitter(iaTechFormatted.title, iaTechFormatted.filename.replace('.md',''), 'ia-tech')
    log(`\n✅ Article 1 généré : ${iaTechFormatted.title} (${iaTechFormatted.wordCount} mots) - ${iaTech.usedApi}`);
    log(`   📁 ${iaTechPath}`);

    // Generate business-en-ligne article
    const business = await generateArticle('business-en-ligne');
    const businessFormatted = formatArticle(business.content, 'business-en-ligne');
    const businessPath = saveArticle('business-en-ligne', businessFormatted);
    await postToTwitter(businessFormatted.title, businessFormatted.filename.replace('.md',''), 'business-en-ligne')
    log(`\n✅ Article 2 généré : ${businessFormatted.title} (${businessFormatted.wordCount} mots) - ${business.usedApi}`);
    log(`   📁 ${businessPath}`);

    log('\n' + '='.repeat(50));
    log('🎉 Génération terminée avec succès !');
    
  } catch (error) {
    log('\n❌ Échec de la génération:');
    console.error('ERREUR COMPLÈTE:', error)
    logError('Génération articles', error);
    process.exit(1);
  }
}

// Run if called directly
main();

export { generateArticle, formatArticle, saveArticle };
