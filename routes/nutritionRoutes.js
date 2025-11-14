// routes/nutritionRoutes.js
const express = require('express');
const router = express.Router();

// Nutrition calculation endpoint
router.post('/calculate-nutrition', (req, res) => {
    try {
        const { age, gender, height, weight, activity, goal, dietType } = req.body;

        // Validate required fields
        if (!age || !height || !weight) {
            return res.status(400).json({ 
                error: 'Please fill in all required fields' 
            });
        }

        // Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
        let bmr;
        if (gender === 'male') {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        // Calculate TDEE (Total Daily Energy Expenditure)
        const tdee = bmr * parseFloat(activity);

        // Calculate calorie target based on goal
        let calorieTarget;
        switch(goal) {
            case 'lose':
                calorieTarget = tdee - 500;
                break;
            case 'gain':
                calorieTarget = tdee + 500;
                break;
            default:
                calorieTarget = tdee;
        }

        // Calculate macronutrient distribution based on diet type
        let proteinPercentage, carbsPercentage, fatPercentage;

        switch(dietType) {
            case 'balanced':
                proteinPercentage = 0.20;
                carbsPercentage = 0.50;
                fatPercentage = 0.30;
                break;
            case 'low-fat':
                proteinPercentage = 0.25;
                carbsPercentage = 0.60;
                fatPercentage = 0.15;
                break;
            case 'low-carb':
                proteinPercentage = 0.30;
                carbsPercentage = 0.20;
                fatPercentage = 0.50;
                break;
            case 'high-protein':
                proteinPercentage = 0.35;
                carbsPercentage = 0.40;
                fatPercentage = 0.25;
                break;
            case 'custom':
                proteinPercentage = 0.20;
                carbsPercentage = 0.50;
                fatPercentage = 0.30;
                break;
            default:
                proteinPercentage = 0.20;
                carbsPercentage = 0.50;
                fatPercentage = 0.30;
        }

        // Calculate grams for each macronutrient
        const proteinGrams = Math.round((calorieTarget * proteinPercentage) / 4);
        const carbsGrams = Math.round((calorieTarget * carbsPercentage) / 4);
        const fatGrams = Math.round((calorieTarget * fatPercentage) / 9);

        // Calculate sugar (typically 10-20% of carbs)
        const sugarPercentage = 0.15;
        const sugarGrams = Math.round(carbsGrams * sugarPercentage);

        // Calculate ranges
        const proteinMin = Math.round(proteinGrams * 0.5);
        const proteinMax = Math.round(proteinGrams * 1.4);

        const carbsMin = Math.round(carbsGrams * 0.8);
        const carbsMax = Math.round(carbsGrams * 1.35);

        const fatMin = Math.round(fatGrams * 0.6);
        const fatMax = Math.round(fatGrams * 1.4);

        const sugarMin = Math.round(sugarGrams * 0.8);
        const sugarMax = Math.round(sugarGrams * 1.4);

        // Calculate sugar and saturated fat limits
        const sugarLimit = Math.round(calorieTarget * 0.1 / 4);
        const saturatedFatLimit = Math.round(calorieTarget * 0.1 / 9);

        // Prepare response
        const results = {
            protein: { value: proteinGrams, range: proteinMin + ' - ' + proteinMax },
            carbs: { value: carbsGrams, range: carbsMin + ' - ' + carbsMax },
            sugar: { value: sugarGrams, range: sugarMin + ' - ' + sugarMax },
            fat: { value: fatGrams, range: fatMin + ' - ' + fatMax },
            sugarLimit: sugarLimit,
            saturatedFatLimit: saturatedFatLimit,
            calories: Math.round(calorieTarget),
            kj: Math.round(calorieTarget * 4.184)
        };

        res.json({ 
            success: true,
            results: results
        });

    } catch (error) {
        console.error('Calculation error:', error);
        res.status(500).json({ 
            error: 'Internal server error during calculation' 
        });
    }
});

module.exports = router;