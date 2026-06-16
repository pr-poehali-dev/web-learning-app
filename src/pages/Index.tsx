import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const LOGO = 'https://sun9-82.userapi.com/s/v1/ig2/raix3a3d34tE8qiszMZSsReSO82h0qp9R4ExdNJeaZNP1em0ANfveS5RwsNp5qII3dVXlVqPaQOh_p4Dxt3NmBZ2.jpg?quality=95&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1024x1024&from=bu&u=RP6Cp4Ny_p6izYfew82WynsuXkruRG2hnQb4EGGda_I&cs=1024x0';

const LEVELS = [
  { id: 'novice', emoji: '🌱', title: 'Новичок', desc: 'Никогда не писал код. Объясняем всё с самых основ, простыми словами.' },
  { id: 'amateur', emoji: '🚀', title: 'Любитель', desc: 'Что-то слышал про HTML и CSS. Идём бодро, но без пробелов в знаниях.' },
  { id: 'pro', emoji: '⚡', title: 'Уверенный', desc: 'Понимаю базу, хочу прокачаться до уровня настоящего разработчика.' },
];

const NAV = [
  { id: 'home', label: 'Главная', icon: 'Home' },
  { id: 'lessons', label: 'Уроки', icon: 'BookOpen' },
  { id: 'progress', label: 'Прогресс', icon: 'TrendingUp' },
  { id: 'tests', label: 'Тесты', icon: 'ClipboardCheck' },
  { id: 'profile', label: 'Профиль', icon: 'User' },
  { id: 'certificate', label: 'Сертификат', icon: 'Award' },
];

const TRACKS = [
  { tag: 'HTML', emoji: '🧱', title: 'Структура страниц', lessons: 90, color: 'from-orange-500 to-pink-500' },
  { tag: 'CSS', emoji: '🎨', title: 'Стили и дизайн', lessons: 90, color: 'from-sky-400 to-indigo-500' },
  { tag: 'JavaScript', emoji: '✨', title: 'Логика и интерактив', lessons: 90, color: 'from-fuchsia-500 to-purple-600' },
];

const ACHIEVEMENTS = [
  { emoji: '🔥', title: 'Серия 7 дней', got: true },
  { emoji: '🧱', title: 'Первый тег', got: true },
  { emoji: '🎯', title: '10 тестов подряд', got: true },
  { emoji: '🏆', title: 'Мастер CSS', got: false },
  { emoji: '🚀', title: 'Первый сайт', got: false },
  { emoji: '💎', title: 'Все 270 уроков', got: false },
];

function Header({ active, onNav }: { active: string; onNav: (id: string) => void }) {
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="container flex items-center justify-between h-20 px-4">
        <button onClick={() => onNav('home')} className="flex items-center gap-3 hover-scale">
          <img src={LOGO} alt="WebLerner" className="w-11 h-11 rounded-xl object-cover glow-shadow" />
          <span className="font-display font-extrabold text-2xl tracking-tight text-gradient">WebLerner</span>
        </button>
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => onNav(n.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                active === n.id ? 'bg-aurora text-white glow-shadow' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              <Icon name={n.icon} size={16} />
              {n.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-10 animate-fade-in">
      <span className="text-accent font-mono text-sm uppercase tracking-widest">{kicker}</span>
      <h2 className="font-display font-extrabold text-4xl md:text-5xl mt-2">{title}</h2>
    </div>
  );
}

function HomeSection({ onNav }: { onNav: (id: string) => void }) {
  return (
    <div className="space-y-28">
      <section className="relative pt-16 md:pt-24 text-center">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-primary/30 rounded-full blur-[120px] animate-glow" />
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-accent/20 rounded-full blur-[120px] animate-glow" />
        <div className="relative animate-fade-in">
          <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-glow" />
            270 интерактивных уроков · с нуля до своего сайта
          </span>
          <h1 className="font-display font-extrabold text-5xl md:text-7xl leading-[1.05] max-w-4xl mx-auto">
            Создавайте <span className="text-gradient animate-gradient-shift">крутые сайты</span> своими руками
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-8">
            Учим HTML, CSS и JavaScript понятным языком — как будто объясняем другу.
            После курса вы сможете сделать сайт не хуже этого.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
            <Button size="lg" onClick={() => onNav('lessons')} className="bg-aurora animate-gradient-shift text-white text-base h-14 px-8 rounded-2xl glow-shadow hover-scale border-0">
              Начать обучение
              <Icon name="ArrowRight" size={20} className="ml-1" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => onNav('progress')} className="h-14 px-8 rounded-2xl text-base glass border-border hover-scale">
              Мой прогресс
            </Button>
          </div>
        </div>
      </section>

      <section className="grid sm:grid-cols-3 gap-6">
        {[
          { num: '270', label: 'уроков и тестов', emoji: '📚' },
          { num: '3', label: 'технологии: HTML · CSS · JS', emoji: '⚙️' },
          { num: '100%', label: 'практики и интерактива', emoji: '💡' },
        ].map((s, i) => (
          <div key={s.label} className="glass rounded-3xl p-8 text-center hover-scale animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="text-4xl mb-3">{s.emoji}</div>
            <div className="font-display font-extrabold text-5xl text-gradient">{s.num}</div>
            <div className="text-muted-foreground mt-2">{s.label}</div>
          </div>
        ))}
      </section>

      <section>
        <SectionTitle kicker="Программа" title="Три трека обучения" />
        <div className="grid md:grid-cols-3 gap-6">
          {TRACKS.map((t, i) => (
            <button
              key={t.tag}
              onClick={() => onNav('lessons')}
              className="group relative text-left glass rounded-3xl p-8 overflow-hidden hover-scale animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`absolute -top-16 -right-16 w-44 h-44 rounded-full bg-gradient-to-br ${t.color} opacity-30 blur-2xl group-hover:opacity-60 transition-opacity`} />
              <div className="relative">
                <div className="text-5xl mb-5">{t.emoji}</div>
                <span className={`inline-block text-xs font-mono font-bold px-3 py-1 rounded-full bg-gradient-to-r ${t.color} text-white`}>{t.tag}</span>
                <h3 className="font-display font-bold text-2xl mt-4">{t.title}</h3>
                <p className="text-muted-foreground mt-2">{t.lessons} уроков с практикой</p>
                <span className="inline-flex items-center gap-1 text-accent font-medium mt-5 group-hover:gap-2 transition-all">
                  Открыть <Icon name="ArrowRight" size={16} />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function LessonsSection() {
  const lessons = [
    { n: 1, title: 'Что такое HTML и зачем он нужен', type: 'Урок', done: true },
    { n: 2, title: 'Заголовки: тег <h1> и его братья', type: 'Урок', done: true },
    { n: 3, title: 'Проверка знаний: первые теги', type: 'Тест', done: true },
    { n: 4, title: 'Абзацы и текст: тег <p>', type: 'Урок', done: false },
    { n: 5, title: 'Ссылки: путешествуем по интернету', type: 'Урок', done: false },
    { n: 6, title: 'Проверка знаний: текст и ссылки', type: 'Тест', done: false },
  ];
  return (
    <div>
      <SectionTitle kicker="270 уроков" title="Уроки и тесты" />
      <div className="space-y-3">
        {lessons.map((l, i) => (
          <div
            key={l.n}
            className="group glass rounded-2xl p-5 flex items-center gap-5 hover-scale animate-fade-in cursor-pointer"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold ${l.done ? 'bg-aurora text-white' : 'bg-secondary text-muted-foreground'}`}>
              {l.done ? <Icon name="Check" size={22} /> : l.n}
            </div>
            <div className="flex-1 min-w-0">
              <span className={`text-xs font-mono uppercase tracking-wider ${l.type === 'Тест' ? 'text-accent' : 'text-primary'}`}>{l.type}</span>
              <h3 className="font-display font-semibold text-lg truncate">{l.title}</h3>
            </div>
            <Icon name="ChevronRight" size={22} className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
          </div>
        ))}
      </div>
      <p className="text-center text-muted-foreground mt-8 font-mono text-sm">…и ещё 264 урока впереди 🚀</p>
    </div>
  );
}

function ProgressSection() {
  const tracks = [
    { tag: 'HTML', done: 38, total: 90, color: 'from-orange-500 to-pink-500' },
    { tag: 'CSS', done: 12, total: 90, color: 'from-sky-400 to-indigo-500' },
    { tag: 'JavaScript', done: 3, total: 90, color: 'from-fuchsia-500 to-purple-600' },
  ];
  const total = tracks.reduce((a, t) => a + t.done, 0);
  const pct = Math.round((total / 270) * 100);
  return (
    <div>
      <SectionTitle kicker="Мой путь" title="Прогресс обучения" />
      <div className="glass rounded-3xl p-8 mb-8 animate-fade-in text-center">
        <div className="relative inline-flex items-center justify-center">
          <div className="font-display font-extrabold text-7xl text-gradient">{pct}%</div>
        </div>
        <p className="text-muted-foreground mt-2">{total} из 270 уроков пройдено</p>
        <Progress value={pct} className="h-3 mt-6" />
      </div>
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {tracks.map((t, i) => (
          <div key={t.tag} className="glass rounded-2xl p-6 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="flex justify-between items-center mb-3">
              <span className="font-display font-bold text-lg">{t.tag}</span>
              <span className="font-mono text-sm text-muted-foreground">{t.done}/{t.total}</span>
            </div>
            <div className="h-3 rounded-full bg-secondary overflow-hidden">
              <div className={`h-full rounded-full bg-gradient-to-r ${t.color}`} style={{ width: `${(t.done / t.total) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
      <h3 className="font-display font-bold text-2xl mb-5">🏅 Достижения</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {ACHIEVEMENTS.map((a, i) => (
          <div
            key={a.title}
            className={`glass rounded-2xl p-5 text-center animate-fade-in ${a.got ? '' : 'opacity-40 grayscale'}`}
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <div className="text-4xl mb-2">{a.emoji}</div>
            <div className="font-medium text-sm">{a.title}</div>
            {!a.got && <div className="text-xs text-muted-foreground mt-1">заблокировано</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function TestsSection() {
  const tests = [
    { title: 'Основы HTML', q: 10, best: 90, color: 'from-orange-500 to-pink-500' },
    { title: 'Селекторы CSS', q: 12, best: 75, color: 'from-sky-400 to-indigo-500' },
    { title: 'Переменные в JS', q: 8, best: 0, color: 'from-fuchsia-500 to-purple-600' },
  ];
  return (
    <div>
      <SectionTitle kicker="Проверка знаний" title="Тесты" />
      <div className="grid md:grid-cols-3 gap-6">
        {tests.map((t, i) => (
          <div key={t.title} className="glass rounded-3xl p-7 hover-scale animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center mb-5`}>
              <Icon name="ClipboardCheck" size={26} className="text-white" />
            </div>
            <h3 className="font-display font-bold text-xl">{t.title}</h3>
            <p className="text-muted-foreground text-sm mt-1">{t.q} вопросов</p>
            <div className="flex items-center justify-between mt-5">
              <span className="text-sm text-muted-foreground">Лучший результат</span>
              <span className={`font-display font-bold ${t.best ? 'text-accent' : 'text-muted-foreground'}`}>{t.best ? `${t.best}%` : '—'}</span>
            </div>
            <Button className="w-full mt-5 bg-aurora text-white rounded-xl border-0 hover-scale">
              {t.best ? 'Пройти заново' : 'Начать тест'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileSection({ level }: { level: string }) {
  const lvl = LEVELS.find((l) => l.id === level) ?? LEVELS[0];
  return (
    <div>
      <SectionTitle kicker="Аккаунт" title="Мой профиль" />
      <div className="glass rounded-3xl p-8 md:p-10 animate-fade-in">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full glow-shadow" style={{ background: 'linear-gradient(135deg, hsl(270,95%,65%), hsl(190,95%,55%), hsl(320,90%,60%))' }} />
          <div className="text-center sm:text-left">
            <h3 className="font-display font-extrabold text-3xl">Будущий веб-разработчик</h3>
            <p className="text-muted-foreground mt-1">Ваш уровень: {lvl.emoji} {lvl.title}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { v: '53', l: 'уроков пройдено' },
            { v: '7', l: 'дней подряд 🔥' },
            { v: '12', l: 'тестов сдано' },
            { v: '3', l: 'достижения' },
          ].map((s) => (
            <div key={s.l} className="bg-secondary/50 rounded-2xl p-5 text-center">
              <div className="font-display font-bold text-3xl text-gradient">{s.v}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CertificateSection() {
  return (
    <div>
      <SectionTitle kicker="Финиш курса" title="Сертификат" />
      <div className="relative glass rounded-[2rem] p-10 md:p-16 text-center overflow-hidden animate-scale-in">
        <div className="absolute inset-0 bg-aurora opacity-10 animate-gradient-shift" />
        <div className="relative">
          <div className="text-7xl mb-6 animate-float">🎓</div>
          <span className="font-mono text-accent uppercase tracking-[0.3em] text-sm">Certificate of Completion</span>
          <h3 className="font-display font-extrabold text-4xl md:text-5xl mt-4 text-gradient">WebLerner Pro</h3>
          <p className="text-muted-foreground max-w-md mx-auto mt-6">
            Пройдите все 270 уроков и итоговый тест, чтобы получить именной сертификат веб-разработчика.
          </p>
          <div className="w-full max-w-sm mx-auto mt-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Готовность</span>
              <span className="font-mono font-bold">20%</span>
            </div>
            <Progress value={20} className="h-3" />
          </div>
          <Button disabled className="mt-8 h-12 px-8 rounded-2xl bg-secondary text-muted-foreground border-0">
            <Icon name="Lock" size={18} className="mr-2" />
            Доступно после завершения курса
          </Button>
        </div>
      </div>
    </div>
  );
}

function LevelGate({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[140px] animate-glow" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[140px] animate-glow" />
      <div className="relative max-w-3xl w-full text-center">
        <img src={LOGO} alt="WebLerner" className="w-20 h-20 rounded-2xl object-cover mx-auto glow-shadow animate-float" />
        <h1 className="font-display font-extrabold text-4xl md:text-6xl mt-8 animate-fade-in">
          Добро пожаловать в <span className="text-gradient">WebLerner</span>
        </h1>
        <p className="text-lg text-muted-foreground mt-5 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Подскажите, насколько хорошо вы знакомы с веб-разработкой —
          и мы подберём подходящую подачу материала.
        </p>
        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {LEVELS.map((l, i) => (
            <button
              key={l.id}
              onClick={() => onSelect(l.id)}
              className="group glass rounded-3xl p-7 text-center hover-scale animate-fade-in hover:border-primary"
              style={{ animationDelay: `${0.2 + i * 0.1}s` }}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{l.emoji}</div>
              <h3 className="font-display font-bold text-xl">{l.title}</h3>
              <p className="text-sm text-muted-foreground mt-3">{l.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const Index = () => {
  const [level, setLevel] = useState<string | null>(null);
  const [section, setSection] = useState('home');

  if (!level) return <LevelGate onSelect={setLevel} />;

  return (
    <div className="min-h-screen">
      <Header active={section} onNav={setSection} />
      <main className="container px-4 py-12 md:py-16">
        {section === 'home' && <HomeSection onNav={setSection} />}
        {section === 'lessons' && <LessonsSection />}
        {section === 'progress' && <ProgressSection />}
        {section === 'tests' && <TestsSection />}
        {section === 'profile' && <ProfileSection level={level} />}
        {section === 'certificate' && <CertificateSection />}
      </main>

      <nav className="lg:hidden sticky bottom-0 z-50 glass">
        <div className="flex justify-around py-2">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => setSection(n.id)}
              className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium transition-colors ${
                section === n.id ? 'text-accent' : 'text-muted-foreground'
              }`}
            >
              <Icon name={n.icon} size={20} />
              {n.label}
            </button>
          ))}
        </div>
      </nav>

      <footer className="container px-4 py-10 text-center text-sm text-muted-foreground">
        WebLerner · учу веб-разработке понятным языком 🚀
        <div className="mt-2 font-mono text-xs opacity-60">© Вахрушев И.Г. 2026 г.</div>
      </footer>
    </div>
  );
};

export default Index;