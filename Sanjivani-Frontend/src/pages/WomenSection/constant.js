import pcoss_image from './assetss/pcos_image.png'
import mentural_cramps from './assetss/mentural_cramps.png'
import uti_image from './assetss/uti_image.png'
import endometri from './assetss/endometri.png'
import vyi from './assetss/vyi.png'
import anemia from './assetss/anemia.png'
export const EMERGENCY_CONDITIONS = [
    {
      name: "Menstrual Cramps",
      icon: mentural_cramps,
      description: "Severe abdominal pain during menstruation due to uterine contractions. It can be accompanied by nausea, headaches, dizziness, and fatigue. Cramps typically begin a day or two before menstruation and last for a few days, with varying intensity among individuals. Severe cramps can interfere with daily activities and may require medical attention if they persist beyond the normal cycle.",
      recoveryPlan: {
        duration: "7 days",
        dailyPlan: [
          {
            day: 1,
            foodIntake: "Increase magnesium-rich foods (bananas, dark chocolate, spinach). Stay hydrated with warm herbal teas like chamomile and ginger tea.",
            sleepHours: "8 hours",
            avoid: "Caffeine, carbonated drinks, processed foods."
          },
          {
            day: 2,
            foodIntake: "Consume omega-3 rich foods such as salmon and flaxseeds. Drink plenty of water.",
            sleepHours: "7-9 hours",
            avoid: "Excessive sugar, alcohol, and smoking."
          },
          {
            day: 3,
            foodIntake: "Increase calcium intake with yogurt, almonds, and leafy greens.",
            sleepHours: "8 hours",
            avoid: "Fatty and fried foods."
          },
          {
            day: 4,
            foodIntake: "Incorporate turmeric and ginger into meals for anti-inflammatory benefits.",
            sleepHours: "7-8 hours",
            avoid: "Overexertion and stress."
          },
          {
            day: 5,
            foodIntake: "Eat fiber-rich foods like oats, lentils, and vegetables to support digestion.",
            sleepHours: "8-9 hours",
            avoid: "Dairy products if sensitive to them."
          },
          {
            day: 6,
            foodIntake: "Drink warm lemon water in the morning and eat small, frequent meals.",
            sleepHours: "7-8 hours",
            avoid: "Processed meats and salty foods."
          },
          {
            day: 7,
            foodIntake: "Consume light, easy-to-digest meals with plenty of greens.",
            sleepHours: "8 hours",
            avoid: "Skipping meals and dehydration."
          }
        ]
      },
      visitDoctor: "If cramps persist for more than a week, become unbearable, or are accompanied by excessive bleeding, vomiting, or fainting, consult a doctor immediately."
    },
    {
      name: "Urinary Tract Infection (UTI)",
      icon: uti_image,
      description: "Bacterial infection affecting the urinary system, causing pain during urination, frequent urge to urinate, cloudy or strong-smelling urine, and lower abdominal discomfort. UTIs are more common in women due to their shorter urethra, allowing bacteria to travel quickly to the bladder.",
      recoveryPlan: {
        duration: "7 days",
        dailyPlan: [
          {
            day: 1,
            foodIntake: "Drink cranberry juice and water. Include probiotic-rich foods like yogurt and kefir.",
            sleepHours: "9 hours",
            avoid: "Caffeine and spicy foods."
          },
          {
            day: 2,
            foodIntake: "Increase vitamin C intake with oranges, bell peppers, and strawberries.",
            sleepHours: "8 hours",
            avoid: "Holding urine for long periods."
          },
          {
            day: 3,
            foodIntake: "Eat lean proteins such as chicken and fish. Drink plenty of herbal teas.",
            sleepHours: "9 hours",
            avoid: "Alcohol and sugary drinks."
          },
          {
            day: 4,
            foodIntake: "Continue hydration with electrolyte-rich fluids. Eat fiber-rich foods to support digestion.",
            sleepHours: "8-10 hours",
            avoid: "Tight-fitting synthetic underwear."
          },
          {
            day: 5,
            foodIntake: "Include garlic in meals for natural antibacterial benefits.",
            sleepHours: "8 hours",
            avoid: "Processed foods high in salt."
          },
          {
            day: 6,
            foodIntake: "Drink unsweetened coconut water and eat foods that support gut health.",
            sleepHours: "9 hours",
            avoid: "Artificial sweeteners and soda."
          },
          {
            day: 7,
            foodIntake: "Consume light, nourishing soups and herbal teas to aid recovery.",
            sleepHours: "8-9 hours",
            avoid: "Skipping meals and stress."
          }
        ]
      },
      visitDoctor: "If symptoms persist beyond a week, worsen, or include fever, nausea, or back pain, seek medical attention immediately."
    },
    // More conditions can be added following the same structure
        // Existing conditions...
        {
          name: "Polycystic Ovary Syndrome (PCOS)",
          description: "A hormonal disorder common among women of reproductive age, characterized by irregular menstrual cycles, excess androgen levels, and polycystic ovaries. Symptoms include weight gain, acne, hair thinning, and fertility issues. PCOS can also increase the risk of diabetes and heart disease.",
          icon: pcoss_image,
          recoveryPlan: {
            duration: "30 days",
            dailyPlan: [
              {
                day: 1,
                foodIntake: "Focus on low-glycemic foods like whole grains, legumes, and vegetables. Avoid refined sugars and processed carbs.",
                sleepHours: "8 hours",
                avoid: "Sugary snacks and drinks."
              },
              {
                day: 2,
                foodIntake: "Include lean proteins like chicken, fish, and tofu. Add healthy fats like avocado and nuts.",
                sleepHours: "7-8 hours",
                avoid: "Fried and fatty foods."
              },
              {
                day: 3,
                foodIntake: "Increase fiber intake with fruits, vegetables, and whole grains.",
                sleepHours: "8 hours",
                avoid: "Dairy products if sensitive to them."
              },
              {
                day: 4,
                foodIntake: "Incorporate anti-inflammatory foods like turmeric, ginger, and green leafy vegetables.",
                sleepHours: "7-9 hours",
                avoid: "Processed meats and high-sodium foods."
              },
              {
                day: 5,
                foodIntake: "Drink herbal teas like spearmint tea to help reduce androgen levels.",
                sleepHours: "8 hours",
                avoid: "Caffeine and alcohol."
              },
              {
                day: 6,
                foodIntake: "Consume omega-3 rich foods like salmon, walnuts, and flaxseeds.",
                sleepHours: "7-8 hours",
                avoid: "Artificial sweeteners and soda."
              },
              {
                day: 7,
                foodIntake: "Eat small, frequent meals to maintain blood sugar levels.",
                sleepHours: "8-9 hours",
                avoid: "Skipping meals and stress."
              }
            ]
          },
          visitDoctor: "If symptoms like irregular periods, excessive hair growth, or weight gain persist, consult a doctor for hormonal evaluation and management."
        },
        {
          name: "Endometriosis",
          icon: endometri,
          description: "A condition where tissue similar to the lining of the uterus grows outside the uterus, causing severe pelvic pain, painful periods, and infertility. It can also lead to fatigue, bloating, and digestive issues.",
          recoveryPlan: {
            duration: "14 days",
            dailyPlan: [
              {
                day: 1,
                foodIntake: "Focus on anti-inflammatory foods like berries, leafy greens, and nuts.",
                sleepHours: "8 hours",
                avoid: "Processed foods and red meat."
              },
              {
                day: 2,
                foodIntake: "Increase omega-3 intake with fatty fish, chia seeds, and walnuts.",
                sleepHours: "7-8 hours",
                avoid: "Dairy products if they worsen symptoms."
              },
              {
                day: 3,
                foodIntake: "Include fiber-rich foods like whole grains, fruits, and vegetables.",
                sleepHours: "8 hours",
                avoid: "Caffeine and alcohol."
              },
              {
                day: 4,
                foodIntake: "Drink herbal teas like chamomile and ginger to reduce inflammation.",
                sleepHours: "7-9 hours",
                avoid: "Sugary snacks and drinks."
              },
              {
                day: 5,
                foodIntake: "Consume magnesium-rich foods like spinach, almonds, and dark chocolate.",
                sleepHours: "8 hours",
                avoid: "Fried and fatty foods."
              },
              {
                day: 6,
                foodIntake: "Eat small, frequent meals to avoid bloating and discomfort.",
                sleepHours: "7-8 hours",
                avoid: "Artificial sweeteners and soda."
              },
              {
                day: 7,
                foodIntake: "Incorporate turmeric and ginger into meals for their anti-inflammatory properties.",
                sleepHours: "8-9 hours",
                avoid: "Skipping meals and stress."
              }
            ]
          },
          visitDoctor: "If pelvic pain becomes severe, periods are excessively painful, or fertility issues arise, consult a doctor for further evaluation and treatment."
        },
        {
          name: "Vaginal Yeast Infection",
          icon: vyi,
          description: "A fungal infection caused by an overgrowth of Candida, leading to itching, irritation, and discharge. It is common due to hormonal changes, antibiotics, or a weakened immune system.",
          recoveryPlan: {
            duration: "7 days",
            dailyPlan: [
              {
                day: 1,
                foodIntake: "Avoid sugary foods and refined carbs. Focus on probiotic-rich foods like yogurt and kefir.",
                sleepHours: "8 hours",
                avoid: "Sugary snacks and drinks."
              },
              {
                day: 2,
                foodIntake: "Increase garlic intake for its natural antifungal properties.",
                sleepHours: "7-8 hours",
                avoid: "Alcohol and caffeine."
              },
              {
                day: 3,
                foodIntake: "Consume coconut oil, which has antifungal benefits.",
                sleepHours: "8 hours",
                avoid: "Processed foods and dairy."
              },
              {
                day: 4,
                foodIntake: "Drink plenty of water and herbal teas to flush out toxins.",
                sleepHours: "7-9 hours",
                avoid: "Tight-fitting synthetic underwear."
              },
              {
                day: 5,
                foodIntake: "Eat fiber-rich foods like vegetables and whole grains to support gut health.",
                sleepHours: "8 hours",
                avoid: "Sugary and fried foods."
              },
              {
                day: 6,
                foodIntake: "Include apple cider vinegar in your diet to restore pH balance.",
                sleepHours: "7-8 hours",
                avoid: "Artificial sweeteners and soda."
              },
              {
                day: 7,
                foodIntake: "Consume light, nourishing meals with plenty of greens.",
                sleepHours: "8-9 hours",
                avoid: "Skipping meals and stress."
              }
            ]
          },
          visitDoctor: "If symptoms persist after a week, worsen, or recur frequently, consult a doctor for antifungal treatment."
        },
        {
          name: "Anemia (Iron Deficiency)",
          description: "A condition where the body lacks enough healthy red blood cells to carry adequate oxygen to tissues, causing fatigue, weakness, pale skin, and shortness of breath. It is common in women due to menstrual blood loss, pregnancy, or poor diet.",
          icon: anemia,
          recoveryPlan: {
            duration: "30 days",
            dailyPlan: [
              {
                day: 1,
                foodIntake: "Increase iron-rich foods like spinach, lentils, and red meat. Pair with vitamin C-rich foods for better absorption.",
                sleepHours: "8 hours",
                avoid: "Tea and coffee, which inhibit iron absorption."
              },
              {
                day: 2,
                foodIntake: "Include fortified cereals and beans in your diet.",
                sleepHours: "7-8 hours",
                avoid: "Calcium-rich foods during iron-rich meals."
              },
              {
                day: 3,
                foodIntake: "Consume dark leafy greens, nuts, and seeds.",
                sleepHours: "8 hours",
                avoid: "Processed foods and sugary snacks."
              },
              {
                day: 4,
                foodIntake: "Add vitamin C-rich foods like oranges, strawberries, and bell peppers to meals.",
                sleepHours: "7-9 hours",
                avoid: "Alcohol and caffeine."
              },
              {
                day: 5,
                foodIntake: "Include lean proteins like chicken, fish, and tofu.",
                sleepHours: "8 hours",
                avoid: "Fried and fatty foods."
              },
              {
                day: 6,
                foodIntake: "Drink iron-fortified smoothies with spinach, berries, and almond milk.",
                sleepHours: "7-8 hours",
                avoid: "Artificial sweeteners and soda."
              },
              {
                day: 7,
                foodIntake: "Consume light, iron-rich meals with plenty of greens.",
                sleepHours: "8-9 hours",
                avoid: "Skipping meals and stress."
              }
            ]
          },
          visitDoctor: "If fatigue and weakness persist, or if you experience dizziness, rapid heartbeat, or shortness of breath, consult a doctor for blood tests and iron supplements."
        }
  ];
  