-- ============================================================
-- Studio OS — Outbound sequence seed
-- Run AFTER migration v9.
--
-- Two sequences. Not translations of each other.
-- Same offer, built differently for each language.
--
-- Tokens: {{first_name}} {{company}} {{hook}} {{city}}
-- {{hook}} carries all personalisation. It is hand-written per
-- prospect and stored on prospects.personal_hook. If it is empty,
-- the sender skips the prospect rather than sending a generic mail.
-- ============================================================

-- ------------------------------------------------------------
-- ENGLISH
-- ------------------------------------------------------------

insert into public.sequences (id, name, vertical, lang, is_active)
values ('11111111-1111-1111-1111-111111111111',
        'Eastern Province cold outreach — EN', null, 'en', true)
on conflict (id) do nothing;

insert into public.sequence_steps (sequence_id, step_number, delay_days, channel, subject, body) values

('11111111-1111-1111-1111-111111111111', 1, 0, 'email',
 '{{company}} — one thing I noticed',
$$Hi {{first_name}},

{{hook}}

I run Premiera Live, a film production company in Al Khobar. We shoot for companies across the Eastern Province.

Worth fifteen minutes?

Shareef$$),

('11111111-1111-1111-1111-111111111111', 2, 3, 'whatsapp_manual', null,
$$Hi {{first_name}} — Shareef from Premiera Live. I emailed you a few days ago about {{company}}. Happy to send two examples of similar work if it's useful.$$),

('11111111-1111-1111-1111-111111111111', 3, 7, 'email',
 'Two examples',
$${{first_name}},

Following up with something concrete rather than another pitch.

https://youtu.be/F2Mw7tngDXY
https://www.youtube.com/shorts/uYaq2QtHCns

One long-form, one vertical cut. If either is close to what {{company}} needs, say so and I'll send the treatment we used.

Shareef$$),

('11111111-1111-1111-1111-111111111111', 4, 14, 'email',
 'A different angle',
$${{first_name}},

Different thought.

Most companies treat video as a brand exercise. The ones that get returns treat it as a sales asset — something a client watches before they decide, not after.

For {{company}} that's probably one film, not a campaign. Under a week to shoot.

If it's not a priority this quarter, tell me and I'll stop.

Shareef$$),

('11111111-1111-1111-1111-111111111111', 5, 21, 'email',
 'Closing the loop',
$${{first_name}},

I'll stop here — I don't want to keep landing in your inbox.

If video comes up for {{company}} later this year, my details are below. No follow-up needed on this one.

Shareef$$);


-- ------------------------------------------------------------
-- ARABIC
-- Gulf business register. Verb-first. No نحن نقوم بتقديم.
-- No formal MSA throat-clearing. Written to be read on a phone.
-- ------------------------------------------------------------

insert into public.sequences (id, name, vertical, lang, is_active)
values ('22222222-2222-2222-2222-222222222222',
        'Eastern Province cold outreach — AR', null, 'ar', true)
on conflict (id) do nothing;

insert into public.sequence_steps (sequence_id, step_number, delay_days, channel, subject, body) values

('22222222-2222-2222-2222-222222222222', 1, 0, 'email',
 'ملاحظة عن {{company}}',
$$أهلاً {{first_name}}،

{{hook}}

أنا شريف، أدير بريمييرا لايف — شركة إنتاج أفلام في الخبر. نصوّر لشركات في المنطقة الشرقية.

نتكلم ربع ساعة؟

شريف$$),

('22222222-2222-2222-2222-222222222222', 2, 3, 'whatsapp_manual', null,
$$السلام عليكم {{first_name}}، شريف من بريمييرا لايف. أرسلت لك إيميل قبل كم يوم عن {{company}}. أقدر أرسل لك مثالين من شغلنا إذا يفيدك.$$),

('22222222-2222-2222-2222-222222222222', 3, 7, 'email',
 'مثالين',
$${{first_name}},

أرسل لك شي ملموس بدل رسالة ثانية.

https://youtu.be/9D3mbt5LI8M
https://www.youtube.com/shorts/uYaq2QtHCns

واحد طويل وواحد عمودي. إذا أحدهم قريب من احتياج {{company}}، قل لي وأرسل لك المعالجة اللي اشتغلنا عليها.

شريف$$),

('22222222-2222-2222-2222-222222222222', 4, 14, 'email',
 'زاوية ثانية',
$${{first_name}}،

فكرة مختلفة.

أغلب الشركات تتعامل مع الفيديو كعمل هوية. اللي يحققون عائد يتعاملون معه كأداة بيع — شي يشوفه العميل قبل ما يقرر، مو بعد.

بالنسبة لـ {{company}} غالباً فيلم واحد يكفي، مو حملة كاملة. التصوير أقل من أسبوع.

إذا الموضوع مو أولوية هالربع، قل لي وأوقف.

شريف$$),

('22222222-2222-2222-2222-222222222222', 5, 21, 'email',
 'آخر رسالة',
$${{first_name}}،

أوقف هنا — ما أبي أزعجك أكثر.

إذا جا وقت الفيديو لـ {{company}} خلال السنة، بياناتي تحت. ما يحتاج ترد على هذي.

شريف$$);
