insert into public.restaurant_entries
  (id, restaurant_name, visit_date, dishes, rating, notes, full_review, tags, photo_url, created_at)
values
('1a2b3c4d-0001-4000-8000-000000000001', 'Nonna Rosa', '2026-06-20',
  '[{"id":"d1","name":"Cacio e Pepe"},{"id":"d2","name":"Burrata Caprese"}]'::jsonb,
  5, 'Best pasta in the city. Ask for extra black pepper.',
  'Nonna Rosa has quietly become our go-to for anniversaries, and this visit confirmed why. The cacio e pepe is silky without being heavy, balanced with just enough cracked pepper to keep it interesting bite after bite. The burrata caprese arrived ice-cold and impossibly creamy, paired with tomatoes that actually tasted like summer. Service was attentive without hovering, and the dim lighting makes it easy to linger over a second glass of wine. If you''re planning something special, request the corner table by the window — it''s the quietest spot in the room.',
  array['date_night','special_occasion'], 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop&q=80', '2026-06-20T19:32:00.000Z'),

('1a2b3c4d-0002-4000-8000-000000000002', 'Taco Bravo', '2026-06-15',
  '[{"id":"d3","name":"Al Pastor Tacos"}]'::jsonb,
  4, 'Quick and solid, great salsa bar.',
  'Taco Bravo is the kind of place you can duck into for a fifteen-minute lunch and still leave satisfied. The al pastor is marinated well and gets a nice char from the trompo, and the self-serve salsa bar has enough variety to keep things interesting if you''re a regular. It''s not fine dining by any stretch, but for the price and speed it''s hard to beat in this neighborhood. Cash is preferred even though they technically take cards, so come prepared.',
  array['quick_lunch'], 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop&q=80', '2026-06-15T12:10:00.000Z'),

('1a2b3c4d-0003-4000-8000-000000000003', 'The Garden Table', '2026-06-10',
  '[{"id":"d4","name":"Roasted Beet Salad"},{"id":"d5","name":"Mushroom Risotto"}]'::jsonb,
  5, 'Perfect spot for a celebration dinner.',
  'We booked The Garden Table for a friend''s promotion and it turned out to be a great call for a group of six. The roasted beet salad was the table favorite — earthy, slightly sweet, with a citrus dressing that cut through the richness of everything else we ordered. The mushroom risotto was creamy without feeling dense, though it could''ve used a touch more salt. Plating here is genuinely beautiful, almost too pretty to eat, and the staff were happy to split dishes for the table without making a fuss about it.',
  array['group','special_occasion'], 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&q=80', '2026-06-10T20:05:00.000Z'),

('1a2b3c4d-0004-4000-8000-000000000004', 'Ramen Den', '2026-06-05',
  '[{"id":"d6","name":"Tonkotsu Ramen","notes":"extra chashu"}]'::jsonb,
  4, 'Rich broth, a bit salty by the end.',
  'Ramen Den''s tonkotsu broth is genuinely rich — you can tell it''s been simmering for a long time, with that cloudy, collagen-heavy texture good tonkotsu needs. The extra chashu was worth the upcharge, melt-in-your-mouth tender. My only knock is that the broth leans a little salty toward the bottom of the bowl, so I''d suggest asking for it on the lighter side if you''re sensitive to sodium. Seating is tight and the wait can stretch past twenty minutes on weekends, but the turnaround once you''re seated is fast.',
  array['quick_lunch'], 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=400&h=300&fit=crop&q=80', '2026-06-05T13:20:00.000Z'),

('1a2b3c4d-0005-4000-8000-000000000005', 'Bistro 22', '2026-05-28',
  '[{"id":"d7","name":"Steak Frites"}]'::jsonb,
  3, 'Good but pricey, service was slow.',
  'Bistro 22 looks the part — white tablecloths, dim lighting, a wine list that takes a while to get through — but the execution didn''t quite match the price tag this time. The steak frites were cooked properly and the fries were genuinely excellent, crisp on the outside and fluffy inside. That said, we waited almost twenty minutes between courses, and the table next to us got their food before we did despite ordering after us. Fine for an expense-account business dinner where time isn''t the priority, but I''d skip it if you''re in a hurry.',
  array['business'], 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop&q=80', '2026-05-28T19:00:00.000Z'),

('1a2b3c4d-0006-4000-8000-000000000006', 'Sunny Side Cafe', '2026-05-22',
  '[{"id":"d8","name":"Avocado Toast"},{"id":"d9","name":"Cold Brew"}]'::jsonb,
  4, 'Great weekend brunch spot with the kids.',
  'Sunny Side Cafe has become our standing Sunday morning spot since the kids actually sit still here, which says a lot. The avocado toast is simple but well-executed — good bread, a perfectly cooked egg on top, and they don''t skimp on the avocado like some places do. Cold brew is smooth and not overly bitter. It gets crowded by 10am so we''ve learned to show up right when they open, but the patio seating is worth the early start, especially in good weather.',
  array['family'], 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop&q=80', '2026-05-22T10:15:00.000Z'),

('1a2b3c4d-0007-4000-8000-000000000007', 'Golden Dragon', '2026-05-18',
  '[{"id":"d10","name":"Kung Pao Chicken"}]'::jsonb,
  3, 'Decent, nothing special.',
  'Golden Dragon is a reliable fallback when you want Chinese takeout and don''t want to think too hard about it. The kung pao chicken hit the basic notes — a bit of heat, good amount of peanuts — but it didn''t have much depth beyond that, and the sauce was on the sweeter side compared to other places I''ve tried. Portions are generous for the price, which counts for something. Wouldn''t go out of my way for it, but it''s perfectly fine if you''re already in the area.',
  array['quick_lunch'], 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&h=300&fit=crop&q=80', '2026-05-18T18:40:00.000Z'),

('1a2b3c4d-0008-4000-8000-000000000008', 'Sakura Sushi', '2026-05-10',
  '[{"id":"d11","name":"Omakase"}]'::jsonb,
  5, 'Incredible omakase, worth every penny. Book ahead.',
  'The omakase at Sakura Sushi is on another level — twelve courses, each one explained by the chef as it''s placed in front of you, with fish that''s clearly sourced with real care. The standout for me was a piece of fatty tuna that practically dissolved before I could chew it. It''s not cheap, and you''ll want to book at least two weeks out for a weekend slot, but this is the kind of meal worth planning a special occasion around. Sit at the counter if you can — watching the prep is half the experience.',
  array['date_night','special_occasion'], 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop&q=80', '2026-05-10T20:30:00.000Z'),

('1a2b3c4d-0009-4000-8000-000000000009', 'Burger Joint', '2026-05-02',
  '[{"id":"d12","name":"Double Cheeseburger"}]'::jsonb,
  4, 'Reliable go-to for a quick group lunch.',
  'Burger Joint nails the basics: a well-seasoned patty, a bun that holds up without getting soggy, and fries that come out hot every time. It''s loud and casual, which makes it an easy pick when you''re trying to get a group fed without much planning. The double cheeseburger is the move if you''re hungry — the single felt a little small for the price. Not groundbreaking, but consistent, and consistency counts for a lot in a lunch spot.',
  array['group','quick_lunch'], 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&q=80', '2026-05-02T12:50:00.000Z'),

('1a2b3c4d-0010-4000-8000-000000000010', 'Le Petit Marche', '2026-04-25',
  '[{"id":"d13","name":"Coq au Vin"},{"id":"d14","name":"Creme Brulee"}]'::jsonb,
  5, 'Cozy, romantic, perfect anniversary dinner.',
  'Le Petit Marche is small, candlelit, and exactly the kind of place you want for an anniversary dinner. The coq au vin was deeply flavored, clearly braised for hours, and came with a side of mashed potatoes that I''d happily order on its own. The creme brulee for dessert had a perfectly torched top that cracked just right under the spoon. It''s intimate enough that reservations are a must — they only have about ten tables — but if you can get one, it''s worth the planning.',
  array['date_night','special_occasion'], 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop&q=80', '2026-04-25T19:45:00.000Z');
